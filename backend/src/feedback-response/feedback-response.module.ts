import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackResponseService } from './feedback-response.service';
import { FeedbackResponseController } from './feedback-response.controller';
import { FeedbackResponseAnswer } from '../feedback-form/entities/response/feedback-response-answer.entity';
import { FeedbackResponseMetadata } from '../feedback-form/entities/response/feedback-response-metadata.entity';
import { FeedbackResponse } from '../feedback-form/entities/response/feedback-response.entity';
import { FeedbackForm } from '../feedback-form/entities/feedback-form.entity';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeedbackResponse,
      FeedbackForm,
      FeedbackResponseAnswer,
      FeedbackResponseMetadata,
    ]),
    TokenModule,
  ],
  controllers: [FeedbackResponseController],
  providers: [FeedbackResponseService],
  exports: [FeedbackResponseService],
})
export class FeedbackResponseModule {}
