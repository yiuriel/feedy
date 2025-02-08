import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getCurrentUser(@Request() req: any) {
    return this.userService.findOne(req.user.id);
  }
}
