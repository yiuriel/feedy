import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackFormPasswordService {
  private passwordCache: Map<
    string,
    Map<string, { timestamp: number; isValid: boolean }>
  > = null;

  setPasswordValidity(formId: string, userIp: string, isValid: boolean): void {
    this.passwordCache = this.passwordCache || new Map();

    if (!this.passwordCache.has(formId)) {
      this.passwordCache.set(formId, new Map());
    }
    this.passwordCache
      .get(formId)!
      .set(userIp, { timestamp: Date.now(), isValid });
  }

  getPasswordValidity(formId: string, userIp: string): boolean | null {
    this.passwordCache = this.passwordCache || new Map();

    const formCache = this.passwordCache.get(formId);
    if (!formCache) return null;

    const cachedValue = formCache.get(userIp);
    if (!cachedValue) return null;

    const threeMinutesAgo = Date.now() - 3 * 60 * 1000;
    if (cachedValue.timestamp < threeMinutesAgo) {
      formCache.delete(userIp);
      if (formCache.size === 0) {
        this.passwordCache.delete(formId);
        this.passwordCache = null;
      }
      return null;
    }

    return cachedValue.isValid;
  }
}
