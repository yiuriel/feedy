import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { QuestionService } from './question.service';
import { OrganizationCreatedEvent } from 'src/organization/events/organization.created';

@Injectable()
export class QuestionListener {
  constructor(private questionService: QuestionService) {}

  @OnEvent('organization.created')
  async handleOrganizationCreated(orgCreatedEvent: OrganizationCreatedEvent) {
    await this.questionService.generateQuestionsForOrganization(
      orgCreatedEvent.organizationId,
    );
  }
}
