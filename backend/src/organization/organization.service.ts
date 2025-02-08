import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { UpdateOrganizationDto } from '../dtos/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async updateOrganization(id: string, updateDto: UpdateOrganizationDto) {
    await this.organizationRepository.update(id, updateDto);
    return this.organizationRepository.findOne({ where: { id } });
  }
}
