import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../organization/entities/organization.entity';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async updateOrganization(id: string, updateDto: UpdateOrganizationDto) {
    await this.organizationRepository.update(id, {
      name: updateDto.name,
      description: updateDto.description,
      industry: updateDto.industry,
      size: updateDto.size,
    });
    return this.organizationRepository.findOne({ where: { id } });
  }

  async getOrganization(id: string) {
    return this.organizationRepository.findOne({ where: { id } });
  }

  async orgNeedsDetails(id: string) {
    const organization = await this.getOrganization(id);

    return (
      !organization ||
      !organization.name ||
      !organization.industry ||
      !organization.size
    );
  }
}
