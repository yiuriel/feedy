import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginData: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.login(loginData, res);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(
      registerDto.user,
      registerDto.organization,
      registerDto.subscription,
      res,
    );
    return result;
  }

  @Get('verify')
  verifyToken(@Request() req: any) {
    return this.authService.verifyToken(req);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.logout(res);

    return {
      success: true,
    };
  }
}
