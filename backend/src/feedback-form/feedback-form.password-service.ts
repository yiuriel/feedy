import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackFormPasswordService {
  private passwordCache: Map<
    string,
    Map<string, { timestamp: number; isValid: boolean }>
  > = new Map();

  setPasswordValidity(formId: string, userIp: string, isValid: boolean): void {
    if (!this.passwordCache.has(formId)) {
      this.passwordCache.set(formId, new Map());
    }
    this.passwordCache
      .get(formId)!
      .set(userIp, { timestamp: Date.now(), isValid });
  }

  getPasswordValidity(formId: string, userIp: string): boolean | null {
    const formCache = this.passwordCache.get(formId);
    if (!formCache) return null;

    const cachedValue = formCache.get(userIp);
    if (!cachedValue) return null;

    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    if (cachedValue.timestamp < fiveMinutesAgo) {
      formCache.delete(userIp);
      if (formCache.size === 0) {
        this.passwordCache.delete(formId);
      }
      return null;
    }

    return cachedValue.isValid;
  }
}
