import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LLMService } from '../services/llm.service';

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
      throw new BadRequestException('Company name is reqired');
    }

    const message = await this.llmService.generateThankYouMessage(
      dto.companyName,
    );

    return {
      success: true,
      message,
    };
  }
}
