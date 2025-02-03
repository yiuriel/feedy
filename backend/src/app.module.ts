import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { Organization } from './entities/organization.entity';
import { FeedbackForm } from './entities/feedback-form.entity';
import { FeedbackResponse } from './entities/feedback-response.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Organization, FeedbackForm, FeedbackResponse]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
