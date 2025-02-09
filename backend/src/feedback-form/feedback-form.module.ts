import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackForm } from '../entities/feedback-form.entity';
import { FeedbackFormService } from './feedback-form.service';
import { FeedbackFormController } from './feedback-form.controller';
import { Organization } from '../entities/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackForm, Organization])],
  controllers: [FeedbackFormController],
  providers: [FeedbackFormService],
  exports: [FeedbackFormService],
})
export class FeedbackFormModule {}
