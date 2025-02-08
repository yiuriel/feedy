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

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([FeedbackForm, FeedbackResponse, User]),
    SubscriptionModule,
    AuthModule,
    LLMModule,
    UserModule,
    OrganizationModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
