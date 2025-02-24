import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from './config/database.config';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeedbackFormModule } from './feedback-form/feedback-form.module';
import { FeedbackResponseModule } from './feedback-response/feedback-response.module';
import { MemoryUsageModule } from './memory-usage/memory-usage.module';
import { OrganizationModule } from './organization/organization.module';
import { QuestionModule } from './question/question.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    EventEmitterModule.forRoot({
      delimiter: '.',
      verboseMemoryLeak: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
        blockDuration: 20000,
      },
    ]),
    SubscriptionModule,
    AuthModule,
    // LLMModule,
    UserModule,
    OrganizationModule,
    DashboardModule,
    QuestionModule,
    FeedbackFormModule,
    FeedbackResponseModule,
    TokenModule,
    MemoryUsageModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
