import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Payload } from 'src/auth/types/payload.type';
import { GetUserPayload } from 'src/auth/decorators/get.user.payload';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrganizationService } from './organization.service';
import { UpdateOrganizationDto } from '../dtos/update-organization.dto';

@Controller('organization')
@UseGuards(AuthGuard)
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Post('details')
  async submitDetails(
    @Body() updateDto: UpdateOrganizationDto,
    @GetUserPayload() user: Payload,
  ) {
    return this.organizationService.updateOrganization(
      user.organizationId,
      updateDto,
    );
  }
}
