import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from './config/database.config';
import { FeedbackForm } from './entities/feedback-form.entity';
import { FeedbackResponse } from './entities/feedback-response.entity';
import { User } from './entities/user.entity';
import { LLMModule } from './llm/llm.module';
import { OrganizationModule } from './organization/organization.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { QuestionModule } from './question/question.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([FeedbackForm, FeedbackResponse, User]),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
