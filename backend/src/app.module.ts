import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from './config/database.config';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedbackFormModule } from './feedback-form/feedback-form.module';
import { LLMModule } from './llm/llm.module';
import { OrganizationModule } from './organization/organization.module';
import { QuestionModule } from './question/question.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UserModule } from './user/user.module';
import { FeedbackResponseModule } from './feedback-response/feedback-response.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    EventEmitterModule.forRoot({
      delimiter: '.',
      verboseMemoryLeak: true,
    }),
    SubscriptionModule,
    AuthModule,
    LLMModule,
    UserModule,
    OrganizationModule,
    DashboardModule,
    QuestionModule,
    FeedbackFormModule,
    FeedbackResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
