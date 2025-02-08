import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUserPayload } from '../auth/decorators/get.user.payload';
import { Payload } from '../auth/types/payload.type';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('stats')
  getStats(@GetUserPayload() user: Payload) {
    return this.dashboardService.getStats(user.organizationId);
  }
}
