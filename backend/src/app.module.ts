import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { Organization } from './entities/organization.entity';
import { FeedbackForm } from './entities/feedback-form.entity';
import { FeedbackResponse } from './entities/feedback-response.entity';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { LLMModule } from './llm/llm.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([
      Organization,
      FeedbackForm,
      FeedbackResponse,
      User,
    ]),
    AuthModule,
    LLMModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
