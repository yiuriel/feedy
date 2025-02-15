import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class TokenService {
  private tokens: Set<string> = new Set();

  constructor() {}

  create() {
    const token = randomBytes(16).toString('hex');
    this.tokens.add(token);
    return token;
  }

  validate(token: string) {
    if (this.tokens.has(token)) {
      return true;
    }
    return false;
  }
}
