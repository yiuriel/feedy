import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  Sse,
  MessageEvent,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LLMService } from '../services/llm.service';
import { Observable, map } from 'rxjs';

interface GenerateQuestionsDto {
  companyType: string;
  goals: string;
}

interface GenerateThankYouDto {
  companyName: string;
  responseType: string;
}

@Controller('llm')
// @UseGuards(JwtAuthGuard) // Protect all endpoints with JWT auth
export class LLMController {
  constructor(private readonly llmService: LLMService) {}

  @Sse('generate-questions/stream')
  generateQuestionsStream(
    @Query('companyType') companyType: string,
    @Query('goals') goals: string,
  ): Observable<MessageEvent> {
    return this.llmService
      .generateFeedbackQuestionsStream(companyType, goals)
      .pipe(
        map((data) => ({
          data,
          id: new Date().toISOString(),
          type: 'message',
          retry: 15000,
        })),
      );
  }

  @Post('generate-questions')
  async generateQuestions(@Body() dto: GenerateQuestionsDto) {
    if (!dto.companyType || !dto.goals) {
      throw new BadRequestException('Company type and goals are required');
    }

    const questions = await this.llmService.generateFeedbackQuestions(
      dto.companyType,
      dto.goals,
    );

    return {
      success: true,
      data: questions,
    };
  }

  @Post('generate-thank-you')
  async generateThankYou(@Body() dto: GenerateThankYouDto) {
    if (!dto.companyName) {
      throw new BadRequestException('Company name is required');
    }

    const message = await this.llmService.generateThankYouMessage(
      dto.companyName,
      dto.responseType,
    );

    return {
      success: true,
      data: message,
    };
  }
}
