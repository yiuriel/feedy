import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';
import { FeedbackResponse } from 'src/feedback-form/entities/response/feedback-response.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(FeedbackForm)
    private feedbackFormRepository: Repository<FeedbackForm>,
    @InjectRepository(FeedbackResponse)
    private feedbackResponseRepository: Repository<FeedbackResponse>,
  ) {}

  async getStats(organizationId: string) {
    const [activeForms, totalForms] = await Promise.all([
      this.feedbackFormRepository.count({
        where: { organization: { id: organizationId }, isActive: true },
      }),
      this.feedbackFormRepository.count({
        where: { organization: { id: organizationId } },
      }),
    ]);

    const totalResponses = await this.feedbackResponseRepository
      .createQueryBuilder('response')
      .innerJoin('response.form', 'form')
      .where('form.organizationId = :organizationId', { organizationId })
      .getCount();

    return {
      activeForms,
      totalForms,
      totalResponses,
    };
  }
}
