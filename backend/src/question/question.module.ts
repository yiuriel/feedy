import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';
import { QuestionListener } from './question.listener';
import { LLMModule } from '../llm/llm.module';
import { Organization } from '../organization/entities/organization.entity';
import { QuestionController } from './question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Organization]), LLMModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionListener],
  exports: [QuestionService],
})
export class QuestionModule {}
