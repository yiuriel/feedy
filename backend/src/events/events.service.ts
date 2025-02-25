import { Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EventsService {
  private readonly responseSubjects = new Map<string, Subject<string>>();
  private readonly logger = new Logger(EventsService.name);

  constructor() {
    this.logger.log('EventsService initialized');
  }

  private getOrCreateSubject(organizationId: string): Subject<string> {
    if (!this.responseSubjects.has(organizationId)) {
      this.logger.debug(
        `Creating new subject for organization: ${organizationId}`,
      );
      this.responseSubjects.set(organizationId, new Subject<string>());
    }
    return this.responseSubjects.get(organizationId)!;
  }

  subscribeResponses(organizationId: string) {
    this.logger.log(
      `Subscribing to responses for organization: ${organizationId}`,
    );
    return this.getOrCreateSubject(organizationId)
      .asObservable()
      .pipe(
        map((data) => {
          this.logger.debug(
            `Emitting data for organization ${organizationId}: ${data}`,
          );
          return { data };
        }),
      );
  }

  emitResponses(organizationId: string) {
    const hardcodedCode = 'R-200';
    this.logger.log(
      `Emitting response for organization ${organizationId}: ${hardcodedCode}`,
    );
    this.getOrCreateSubject(organizationId).next(hardcodedCode);
    return hardcodedCode;
  }
}
