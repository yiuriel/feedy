import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackFormSettings } from 'src/entities/feedback-form/feedback-form-settings.entity';
import { FeedbackQuestion } from 'src/entities/feedback-form/feedback-question.entity';
import { DataSource, Repository } from 'typeorm';
import { FeedbackForm } from '../entities/feedback-form/feedback-form.entity';
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
        allowMultipleResponses: data.settings?.allowMultipleResponses,
        stepped: data.settings?.stepped,
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
        password: data.password,
        customThankYouPage: data.customThankYouPage,
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

  async findOne(accessToken: string, organizationId: string) {
    const form = await this.feedbackFormRepository.findOne({
      where: {
        accessToken,
        isActive: true,
        organization: { id: organizationId },
      },
      relations: ['questions', 'formSettings'],
    });

    if (!form) {
      throw new NotFoundException('Feedback form not found');
    }

    return form;
  }

  async getFormWithResponses(accessToken: string, organizationId: string) {
    const form = await this.feedbackFormRepository.findOne({
      where: {
        accessToken,
        isActive: true,
        organization: { id: organizationId },
      },
      relations: [
        'questions',
        'responses',
        'responses.answers',
        'responses.answers.question',
      ],
    });

    if (!form) {
      throw new NotFoundException('Feedback form not found');
    }

    const questionAnswers = form.questions.map((question) => {
      const answers = form.responses.flatMap((response) => {
        return response.answers
          .filter((answer) => answer.question.id === question.id)
          .map(({ id, textAnswer, ratingAnswer, selectedOptions }) => ({
            id,
            textAnswer,
            ratingAnswer,
            selectedOptions,
          }));
      });
      return { question, answers };
    });

    return {
      id: form.id,
      accessToken: form.accessToken,
      questionAnswers,
    };
  }

  async formNeedsPassword(accessToken: string, organizationId: string) {
    const form = await this.feedbackFormRepository.findOne({
      where: {
        accessToken,
        isActive: true,
        organization: { id: organizationId },
      },
      relations: ['questions', 'formSettings'],
    });

    return !!form.password;
  }

  async checkPassword(accessToken: string, password: string) {
    const form = await this.feedbackFormRepository.findOne({
      where: { accessToken, password },
      relations: ['questions', 'formSettings'],
    });

    if (!form) {
      throw new UnauthorizedException('Invalid password');
    }

    return true;
  }

  private createFeedbackFormAccessToken() {
    const token = crypto.randomUUID();
    return token;
  }
}
