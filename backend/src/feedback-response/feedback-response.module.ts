import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackResponseService } from './feedback-response.service';
import { FeedbackResponseController } from './feedback-response.controller';
import { FeedbackResponseAnswer } from 'src/entities/feedback-form/response/feedback-response-answer.entity';
import { FeedbackResponseMetadata } from 'src/entities/feedback-form/response/feedback-response-metadata.entity';
import { FeedbackResponse } from 'src/entities/feedback-form/response/feedback-response.entity';
import { FeedbackForm } from 'src/entities/feedback-form/feedback-form.entity';
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
