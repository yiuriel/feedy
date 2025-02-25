import { Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { HONEY_POT_FIELD_NAME } from './feedback-response.constants';
import { TokenService } from 'src/token/token.service';
import { Response, Request } from 'express';
import { FeedbackResponseAnswer } from 'src/feedback-form/entities/response/feedback-response-answer.entity';
import { FeedbackResponseMetadata } from 'src/feedback-form/entities/response/feedback-response-metadata.entity';
import { FeedbackResponse } from 'src/feedback-form/entities/response/feedback-response.entity';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';
import { EventsService } from 'src/events/events.service';

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
    private readonly tokenService: TokenService,
    private readonly eventsService: EventsService,
  ) {}

  async create(
    createDto: CreateFeedbackResponseDto,
    ipAddress: string,
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<FeedbackResponse> {
    const token = request.cookies.formToken;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    if (!this.tokenService.validate(token)) {
      throw new UnauthorizedException(
        'There was a problem with your request token',
      );
    }

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
        relations: ['organization'],
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

      this.eventsService.emitResponses(form.organization.id);

      return savedResponse;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      res.clearCookie('formToken');
    }
  }

  private async getResponses(
    where:
      | FindOptionsWhere<FeedbackResponse>
      | FindOptionsWhere<FeedbackResponse>[],
  ): Promise<FeedbackResponse[]> {
    return this.responseRepository.find({
      where,
      relations: ['answers', 'answers.question', 'form'],
      order: { submittedAt: 'DESC' },
    });
  }

  private generateCsvContent(responses: FeedbackResponse[]): string {
    if (!responses.length) {
      return 'No responses found';
    }

    const questions = Array.from(
      new Set(
        responses.flatMap((response) =>
          response.answers.map((answer) => answer.question.question),
        ),
      ),
    );

    const headers = ['Form Title', 'Submitted At', ...questions];
    const rows = responses.map((response) => {
      const answerMap = new Map(
        response.answers.map((answer) => [
          answer.question.question,
          answer.textAnswer ||
            answer.ratingAnswer?.toString() ||
            answer.selectedOptions?.join(', ') ||
            '',
        ]),
      );
      return [
        response.form.title,
        response.submittedAt.toISOString(),
        ...questions.map((q) => answerMap.get(q) || ''),
      ];
    });

    return [
      headers.map((header) => `"${header.replace(/"/g, '""')}"`).join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','),
      ),
    ].join('\n');
  }

  async exportResponsesAsCsv(organizationId: string): Promise<string> {
    const responses = await this.getResponses({
      form: { organization: { id: organizationId } },
    });
    return this.generateCsvContent(responses);
  }

  async exportFormResponsesAsCsv(
    accessToken: string,
    organizationId: string,
  ): Promise<string> {
    const responses = await this.getResponses({
      form: { accessToken, organization: { id: organizationId } },
    });
    return this.generateCsvContent(responses);
  }
}
