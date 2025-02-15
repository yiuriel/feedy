import { Test, TestingModule } from '@nestjs/testing';
import { MemoryUsageService } from './memory-usage.service';

describe('MemoryUsageService', () => {
  let service: MemoryUsageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoryUsageService],
    }).compile();

    service = module.get<MemoryUsageService>(MemoryUsageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
