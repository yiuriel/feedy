import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LLMService } from './llm.service';
import { LLMController } from './llm.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 30000, // 30 seconds timeout for LLM requests
      maxRedirects: 5,
    }),
  ],
  controllers: [LLMController],
  providers: [LLMService],
  exports: [LLMService],
})
export class LLMModule {}
