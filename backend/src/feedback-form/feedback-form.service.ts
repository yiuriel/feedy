import {
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackFormSettings } from 'src/entities/feedback-form/feedback-form-settings.entity';
import { FeedbackQuestion } from 'src/entities/feedback-form/feedback-question.entity';
import { DataSource, Repository } from 'typeorm';
import { FeedbackForm } from '../entities/feedback-form/feedback-form.entity';
import { Organization } from '../entities/organization.entity';
import { CreateFeedbackFormDto } from './dto/create-feedback-form.dto';
import { Response } from 'express';
import { TokenService } from '../token/token.service';
import { FeedbackFormPasswordService } from './feedback-form.password-service';

@Injectable()
export class FeedbackFormService {
  constructor(
    @InjectRepository(FeedbackForm)
    private feedbackFormRepository: Repository<FeedbackForm>,
    private readonly dataSource: DataSource,
    private readonly tokenService: TokenService,
    private readonly passwordService: FeedbackFormPasswordService,
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

  async findOne(
    accessToken: string,
    organizationId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
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

    res.cookie('formToken', this.tokenService.create(), {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    });

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

  async remove(accessToken: string, organizationId: string) {
    const form = await this.feedbackFormRepository.findOne({
      where: {
        accessToken,
        organization: { id: organizationId },
      },
    });

    if (!form) {
      throw new NotFoundException('Feedback form not found');
    }

    await this.feedbackFormRepository.remove(form);
  }

  async formNeedsPassword(
    accessToken: string,
    organizationId: string,
    userIp: string,
  ) {
    const isValid = this.passwordService.getPasswordValidity(
      accessToken,
      userIp,
    );

    if (isValid !== null) return !isValid;

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

  async checkPassword(accessToken: string, password: string, userIp: string) {
    const form = await this.feedbackFormRepository.findOne({
      where: { accessToken, password },
      relations: ['questions', 'formSettings'],
    });

    if (!form) {
      throw new UnauthorizedException('Invalid password');
    }

    this.passwordService.setPasswordValidity(accessToken, userIp, true);

    return true;
  }

  async getResponsesOverTime(organizationId: string) {
    const forms = await this.feedbackFormRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.responses', 'response')
      .select(['form.id', 'form.title', 'response.submittedAt'])
      .where('form.organization.id = :organizationId', { organizationId })
      .getMany();

    const responseData = forms.map((form) => ({
      id: form.id,
      title: form.title,
      responses: form.responses
        .map((response) => ({
          date: response.submittedAt,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    }));

    return responseData;
  }

  async getQuestionTypesDistribution(organizationId: string) {
    const forms = await this.feedbackFormRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.questions', 'question')
      .where('form.organization.id = :organizationId', { organizationId })
      .getMany();

    const distribution = {
      text: 0,
      rating: 0,
      multiple_choice: 0,
      checkbox: 0,
    };

    forms.forEach((form) => {
      form.questions.forEach((question) => {
        distribution[question.type]++;
      });
    });

    return Object.entries(distribution).map(([type, count]) => ({
      type,
      count,
    }));
  }

  async getRatingQuestionsAverage(organizationId: string) {
    const forms = await this.feedbackFormRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.questions', 'questions')
      .leftJoinAndSelect('form.responses', 'response')
      .leftJoinAndSelect('response.answers', 'answer')
      .leftJoinAndSelect('answer.question', 'question')
      .where('form.organization.id = :organizationId', { organizationId })
      .andWhere('question.type = :type', { type: 'rating' })
      .getMany();

    const ratingAverages = [];

    forms.forEach((form) => {
      form.questions.forEach((question) => {
        const answers = form.responses
          .flatMap((response) => response.answers)
          .filter((answer) => answer.question.id === question.id);

        if (answers.length > 0) {
          const sum = answers.reduce(
            (acc, answer) => acc + answer.ratingAnswer,
            0,
          );
          const average = sum / answers.length;
          ratingAverages.push({
            formTitle: form.title,
            question: question.question,
            average: Number(average.toFixed(2)),
            totalResponses: answers.length,
          });
        }
      });
    });

    return ratingAverages;
  }

  private createFeedbackFormAccessToken() {
    const token = crypto.randomUUID();
    return token;
  }
}
