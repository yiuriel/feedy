import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FeedbackResponseService } from './feedback-response.service';
import { FeedbackResponse } from 'src/entities/feedback-form/response/feedback-response.entity';
import { Throttle } from '@nestjs/throttler';

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

@Throttle({
  default: {
    limit: 15,
    ttl: 60000, // 1 minute
  },
})
@Controller('feedback-responses')
export class FeedbackResponseController {
  constructor(private readonly responseService: FeedbackResponseService) {}

  @Post()
  async create(
    @Body() createDto: CreateFeedbackResponseDto,
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<FeedbackResponse> {
    const ip =
      request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    return this.responseService.create(createDto, ip as string, request, res);
  }
}
