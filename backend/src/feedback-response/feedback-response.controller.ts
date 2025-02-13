import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { FeedbackResponseService } from './feedback-response.service';
import { FeedbackResponse } from '../entities/feedback-response.entity';

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

@Controller('feedback-responses')
export class FeedbackResponseController {
  constructor(private readonly responseService: FeedbackResponseService) {}

  @Post()
  async create(
    @Body() createDto: CreateFeedbackResponseDto,
    @Req() request: Request,
  ): Promise<FeedbackResponse> {
    const ip =
      request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    return this.responseService.create(createDto, ip as string);
  }
}
