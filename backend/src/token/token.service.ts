import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class TokenService implements OnModuleInit, OnModuleDestroy {
  private tokens: Map<string, number> = new Map();
  private cleanupInterval: NodeJS.Timeout;
  private cleanupTime = 30000;

  constructor() {}

  onModuleInit() {
    console.log('TokenService initialized');

    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined;
    }
    this.cleanupInterval = setInterval(() => this.cleanup(), this.cleanupTime);
  }

  create() {
    const token = randomBytes(16).toString('hex');
    this.tokens.set(token, Date.now());
    return token;
  }

  validate(token: string) {
    return this.tokens.has(token);
  }

  private cleanup() {
    console.log('Cleaning up expired tokens...');
    const now = Date.now();
    for (const [token, timestamp] of this.tokens.entries()) {
      if (now - timestamp > this.cleanupTime) {
        this.tokens.delete(token);
      }
    }
  }

  onModuleDestroy() {
    console.log('TokenService destroyed');
    clearInterval(this.cleanupInterval);
    this.cleanupInterval = undefined;
  }
}
