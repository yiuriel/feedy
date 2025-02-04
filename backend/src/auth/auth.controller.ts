import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SubscriptionPlan } from '../entities/subscription.entity';

// Define the DTO for registration
interface RegisterDto {
  user: {
    email: string;
    password: string;
    name: string;
  };
  organization: {
    name: string;
  };
  subscription: {
    plan: SubscriptionPlan;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.user,
      registerDto.organization,
      registerDto.subscription,
    );
  }
}
