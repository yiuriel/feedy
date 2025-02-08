import { Controller, Get } from '@nestjs/common';
import { GetUserPayload } from 'src/auth/decorators/get.user.payload';
import { Payload } from 'src/auth/types/payload.type';
import { Question } from 'src/entities/question.entity';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestionsByOrganization(
    @GetUserPayload() user: Payload,
  ): Promise<Question[]> {
    return this.questionService.getQuestionsByOrganization();
  }
}
