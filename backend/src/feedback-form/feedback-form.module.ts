import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFormService } from './feedback-form.service';
import { FeedbackFormController } from './feedback-form.controller';
import { Organization } from '../entities/organization.entity';
import { FeedbackForm } from 'src/entities/feedback-form/feedback-form.entity';
import { TokenModule } from 'src/token/token.module';
import { FeedbackFormPasswordService } from './feedback-form.password-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedbackForm, Organization]),
    TokenModule,
  ],
  controllers: [FeedbackFormController],
  providers: [FeedbackFormService, FeedbackFormPasswordService],
  exports: [FeedbackFormService, FeedbackFormPasswordService],
})
export class FeedbackFormModule {}
