import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { SubscriptionService } from '../services/subscription.service';
import * as argon2 from 'argon2';

interface RegisterUserDto {
  email: string;
  password: string;
  name: string;
}

interface RegisterOrgDto {
  name: string;
}

interface RegisterSubscriptionDto {
  plan: 'free' | 'pro';
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    private jwtService: JwtService,
    private subscriptionService: SubscriptionService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await argon2.verify(user.hashedPassword, password))) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    userDto: RegisterUserDto,
    orgDto: RegisterOrgDto,
    subscriptionDto: RegisterSubscriptionDto,
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
    await this.organizationRepository.save(organization);

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
    await this.userRepository.save(user);

    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
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
}
