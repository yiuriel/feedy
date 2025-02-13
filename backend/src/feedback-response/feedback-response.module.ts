import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackResponse } from '../entities/feedback-response.entity';
import { FeedbackResponseService } from './feedback-response.service';
import { FeedbackResponseController } from './feedback-response.controller';
import { FeedbackForm } from '../entities/feedback-form.entity';
import { FeedbackResponseAnswer } from '../entities/feedback-response-answer.entity';
import { FeedbackResponseMetadata } from '../entities/feedback-response-metadata.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeedbackResponse,
      FeedbackForm,
      FeedbackResponseAnswer,
      FeedbackResponseMetadata,
    ]),
  ],
  controllers: [FeedbackResponseController],
  providers: [FeedbackResponseService],
  exports: [FeedbackResponseService],
})
export class FeedbackResponseModule {}
