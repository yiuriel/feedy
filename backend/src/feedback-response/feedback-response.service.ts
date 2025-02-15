import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackForm } from '../entities/feedback-form.entity';
import { FeedbackResponseAnswer } from '../entities/feedback-response-answer.entity';
import { FeedbackResponseMetadata } from '../entities/feedback-response-metadata.entity';
import { FeedbackResponse } from '../entities/feedback-response.entity';
import { HONEY_POT_FIELD_NAME } from './feedback-response.constants';

interface CreateFeedbackResponseDto {
  formId: string;
  answers: Array<{
    questionId: string;
    textAnswer?: string;
    ratingAnswer?: number;
    selectedOptions?: string[];
  }>;
  metadata?: {
    userAgent?: string;
  };
}

@Injectable()
export class FeedbackResponseService {
  constructor(
    @InjectRepository(FeedbackResponse)
    private readonly responseRepository: Repository<FeedbackResponse>,
  ) {}

  async create(
    createDto: CreateFeedbackResponseDto,
    ipAddress: string,
  ): Promise<FeedbackResponse> {
    const firstAnswer = createDto.answers[0];
    if (
      firstAnswer.questionId === HONEY_POT_FIELD_NAME &&
      firstAnswer.textAnswer !== ''
    ) {
      throw new UnauthorizedException('There was a problem with your request');
    }

    const queryRunner =
      this.responseRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const form = await queryRunner.manager.findOneOrFail(FeedbackForm, {
        where: { accessToken: createDto.formId },
      });

      const answersWithoutHoneyPot = createDto.answers.slice(1);

      const response = new FeedbackResponse();
      response.form = form;
      response.submittedAt = new Date();

      const answers = answersWithoutHoneyPot.map((answer) => {
        const responseAnswer = new FeedbackResponseAnswer();
        responseAnswer.question = { id: answer.questionId } as any;
        responseAnswer.textAnswer = answer.textAnswer;
        responseAnswer.ratingAnswer = answer.ratingAnswer;
        responseAnswer.selectedOptions = answer.selectedOptions;
        return responseAnswer;
      });

      response.answers = answers;

      const metadata = new FeedbackResponseMetadata();
      metadata.ipAddress = ipAddress;
      if (createDto.metadata?.userAgent) {
        metadata.userAgent = createDto.metadata.userAgent;
      }
      response.metadata = metadata;

      const savedResponse = await queryRunner.manager.save(response);

      await queryRunner.manager.increment(
        FeedbackForm,
        { id: form.id },
        'responseCount',
        1,
      );

      await queryRunner.commitTransaction();

      return savedResponse;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
