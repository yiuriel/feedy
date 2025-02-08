import { Controller, Get, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Get('me')
  async getCurrentUser(@Request() req: any) {
    return await this.authService.verifyToken(req);
  }
}
