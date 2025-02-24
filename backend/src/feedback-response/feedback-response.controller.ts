import {
  Body,
  Controller,
  Header,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { GetUserPayload } from 'src/auth/decorators/get.user.payload';
import { Payload } from 'src/auth/types/payload.type';
import { FeedbackResponse } from 'src/feedback-form/entities/response/feedback-response.entity';
import { FeedbackResponseService } from './feedback-response.service';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @UseGuards(AuthGuard)
  @Post('export')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=responses.csv')
  async exportResponses(@GetUserPayload() user: Payload): Promise<string> {
    return this.responseService.exportResponsesAsCsv(user.organizationId);
  }

  @UseGuards(AuthGuard)
  @Post('export/:accessToken')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=responses.csv')
  async exportFormResponses(
    @GetUserPayload() user: Payload,
    @Param('accessToken') accessToken: string,
  ): Promise<string> {
    return this.responseService.exportFormResponsesAsCsv(
      accessToken,
      user.organizationId,
    );
  }
}
