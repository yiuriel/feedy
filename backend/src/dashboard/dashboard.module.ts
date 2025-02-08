import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { FeedbackForm } from '../entities/feedback-form.entity';
import { FeedbackResponse } from '../entities/feedback-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackForm, FeedbackResponse])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
