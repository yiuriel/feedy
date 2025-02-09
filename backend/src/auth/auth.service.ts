import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { SubscriptionService } from '../subscription/subscription.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as argon2 from 'argon2';
import { generateUniqueSlug } from '../utils/slug.utils';
import { Response, Request } from 'express';
import { Payload } from './types/payload.type';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { RegisterOrgDto } from '../dtos/register-org.dto';
import { RegisterSubscriptionDto } from '../dtos/register-subscription.dto';
import { noop } from 'src/utils/noop';
import { OrganizationCreatedEvent } from 'src/organization/events/organization.created';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    private jwtService: JwtService,
    private subscriptionService: SubscriptionService,
    private eventEmitter: EventEmitter2,
  ) {}

  async verifyToken(req: Request) {
    try {
      const accessTokenCookie = req.headers.cookie
        ?.split(';')
        .find((c: string) => c.trim().startsWith('access_token='));
      const token = accessTokenCookie?.split('=')?.[1];

      const payload = this.jwtService.verify(token);
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      return { message: 'Token is valid', id: payload.id };
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error);
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'hashedPassword'> | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['organization'],
    });
    if (!user) {
      return null;
    }

    const verifyResult = await Promise.race([
      argon2.verify(user.hashedPassword, password),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Password verification timeout')),
          5000,
        ),
      ),
    ]);

    if (verifyResult) {
      const { hashedPassword, ...result } = user;
      noop(hashedPassword);
      return result;
    }

    return null;
  }

  async login(
    loginData: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.validateUser(loginData.email, loginData.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(this.createPayload(user));

    this.setAccessTokenCookie(res, accessToken);

    return {
      success: true,
    };
  }

  async register(
    userDto: RegisterUserDto,
    orgDto: RegisterOrgDto,
    subscriptionDto: RegisterSubscriptionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const existingUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    // Create the organization first
    const organization = this.organizationRepository.create({
      name: orgDto.name,
    });

    // Generate a unique slug for the organization
    organization.slug = await generateUniqueSlug(orgDto.name, async (slug) => {
      const existingOrg = await this.organizationRepository.findOne({
        where: { slug },
      });
      return !!existingOrg;
    });

    await this.organizationRepository.save(organization);

    this.eventEmitter.emit(
      'organization.created',
      new OrganizationCreatedEvent(organization.id),
    );

    // Create the subscription for the organization
    await this.subscriptionService.createSubscription(
      organization,
      subscriptionDto.plan,
    );

    // Create the user and associate it with the organization
    const hashedPassword = await argon2.hash(userDto.password);

    const user = this.userRepository.create({
      email: userDto.email,
      hashedPassword,
      name: userDto.name,
      organization,
      role: 'admin', // First user is always admin
    });
    organization.users = [user];
    user.organization = organization;
    await this.userRepository.save(user);

    // Generate JWT token
    const accessToken = this.jwtService.sign(this.createPayload(user));

    // Set the JWT token as a cookie
    this.setAccessTokenCookie(res, accessToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      organization: {
        id: organization.id,
        name: organization.name,
      },
    };
  }

  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
  }

  private createPayload(user: User | Omit<User, 'hashedPassword'>): Payload {
    return {
      email: user.email,
      id: user.id,
      organizationId: user.organization.id,
    };
  }

  private setAccessTokenCookie(res: Response, accessToken: string) {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
  }
}
