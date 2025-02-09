import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackFormSettings } from 'src/entities/feedback-form-settings.entity';
import { FeedbackQuestion } from 'src/entities/feedback-question.entity';
import { DataSource, Repository } from 'typeorm';
import { FeedbackForm } from '../entities/feedback-form.entity';
import { Organization } from '../entities/organization.entity';
import { CreateFeedbackFormDto } from './dto/create-feedback-form.dto';

@Injectable()
export class FeedbackFormService {
  constructor(
    @InjectRepository(FeedbackForm)
    private feedbackFormRepository: Repository<FeedbackForm>,
    private readonly dataSource: DataSource,
  ) {}

  async create(organizationId: string, data: CreateFeedbackFormDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const organization = await queryRunner.manager.findOne(Organization, {
        where: { id: organizationId },
      });

      if (!organization) {
        throw new NotFoundException('Organization not found');
      }

      if (data.questions.length === 0) {
        throw new Error('Feedback form must have at least one question');
      }

      const feedbackFormQuestions = data.questions.map((q) => {
        return queryRunner.manager.create(FeedbackQuestion, {
          ...q,
        });
      });

      await queryRunner.manager.save(FeedbackQuestion, feedbackFormQuestions);

      const settings = await queryRunner.manager.create(FeedbackFormSettings, {
        shareType: 'link',
        allowMultipleResponses: false,
      });

      await queryRunner.manager.save(FeedbackFormSettings, settings);

      const feedbackForm = queryRunner.manager.create(FeedbackForm, {
        title: data.title,
        description: data.description,
        isActive: true,
        organization,
        questions: feedbackFormQuestions,
        formSettings: settings,
        accessToken: this.createFeedbackFormAccessToken(),
      });

      const savedForm = await queryRunner.manager.save(
        FeedbackForm,
        feedbackForm,
      );

      await queryRunner.commitTransaction();

      return savedForm;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllByOrganization(organizationId: string) {
    return this.feedbackFormRepository.find({
      where: { organization: { id: organizationId }, isActive: true },
      relations: ['questions', 'formSettings'],
    });
  }

  async findOne(id: string) {
    const form = await this.feedbackFormRepository.findOne({
      where: { id, isActive: true },
    });

    if (!form) {
      throw new NotFoundException('Feedback form not found');
    }

    return form;
  }

  private createFeedbackFormAccessToken() {
    const token = crypto.randomUUID();
    return token;
  }
}
