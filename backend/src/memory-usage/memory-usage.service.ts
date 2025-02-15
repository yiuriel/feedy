import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class MemoryUsageService implements OnModuleInit, OnModuleDestroy {
  private cleanupInterval: NodeJS.Timeout;
  private cleanupTime = 15000; // 15 seconds in milliseconds

  onModuleInit() {
    console.log('MemoryUsageService initialized');
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined;
    }
    this.cleanupInterval = setInterval(
      () => this.memoryLogging(),
      this.cleanupTime,
    );
  }

  onModuleDestroy() {
    console.log('MemoryUsageService destroyed');
    clearInterval(this.cleanupInterval);
    this.cleanupInterval = undefined;
  }

  private memoryLogging() {
    const memoryUsage = process.memoryUsage();
    console.log('Memory usage:');
    console.log('  RSS:', (memoryUsage.rss / 1024 / 1024).toFixed(2), 'MB');
    console.log(
      '  Heap Total:',
      (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
      'MB',
    );
    console.log(
      '  Heap Used:',
      (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
      'MB',
    );
    console.log(
      '  External:',
      (memoryUsage.external / 1024 / 1024).toFixed(2),
      'MB',
    );
    console.log(
      '  Buffers:',
      (memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2),
      'MB',
    );
  }
}
