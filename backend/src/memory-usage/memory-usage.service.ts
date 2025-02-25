import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class MemoryUsageService implements OnModuleInit, OnModuleDestroy {
  private timeoutId: NodeJS.Timeout;
  private cleanupTime = 120000; // 2 minutes in milliseconds

  onModuleInit() {
    this.scheduleMemoryLogging();
  }

  onModuleDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  private scheduleMemoryLogging() {
    this.timeoutId = setTimeout(() => {
      this.memoryLogging();
      this.scheduleMemoryLogging();
    }, this.cleanupTime);
  }

  private memoryLogging() {
    const memoryUsage = process.memoryUsage();
    const formattedDate = new Date().toISOString();
    console.log(`Memory usage at ${formattedDate}:`);
    console.log(`  RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(
      `  Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    );
    console.log(
      `  Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    );
    console.log('------------------ ** ------------------');
  }
}
