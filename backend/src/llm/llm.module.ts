import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LLMService } from '../services/llm.service';
import { LLMController } from '../controllers/llm.controller';

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
