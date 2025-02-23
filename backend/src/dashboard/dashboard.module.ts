import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';
import { FeedbackResponse } from 'src/feedback-form/entities/response/feedback-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackForm, FeedbackResponse])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
