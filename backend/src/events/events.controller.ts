import { Controller, Sse, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetUserPayload } from 'src/auth/decorators/get.user.payload';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Payload } from 'src/auth/types/payload.type';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Sse('responses')
  @UseGuards(AuthGuard)
  subscribeResponses(
    @GetUserPayload() user: Payload,
  ): Observable<{ data: string }> {
    return this.eventsService.subscribeResponses(user.organizationId);
  }
}
