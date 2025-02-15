import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFormService } from './feedback-form.service';
import { FeedbackFormController } from './feedback-form.controller';
import { Organization } from '../entities/organization.entity';
import { FeedbackForm } from 'src/entities/feedback-form/feedback-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackForm, Organization])],
  controllers: [FeedbackFormController],
  providers: [FeedbackFormService],
  exports: [FeedbackFormService],
})
export class FeedbackFormModule {}
