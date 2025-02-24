import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EventsService {
  private readonly responsesSubject = new Subject<string>();

  constructor() {}

  subscribeResponses() {
    return this.responsesSubject.asObservable().pipe(map((data) => ({ data })));
  }

  emitResponses() {
    const hardcodedCode = 'R-200';
    this.responsesSubject.next(hardcodedCode);
    return hardcodedCode;
  }
}
