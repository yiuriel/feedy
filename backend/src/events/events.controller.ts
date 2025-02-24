import { Controller, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Sse('responses')
  subscribeResponses(): Observable<{ data: string }> {
    return this.eventsService.subscribeResponses();
  }
}
