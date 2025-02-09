import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateFeedbackFormDto } from './dto/create-feedback-form.dto';
import { FeedbackFormService } from './feedback-form.service';
import { GetUserPayload } from 'src/auth/decorators/get.user.payload';
import { Payload } from 'src/auth/types/payload.type';

@Controller('feedback-forms')
@UseGuards(AuthGuard)
export class FeedbackFormController {
  constructor(private readonly feedbackFormService: FeedbackFormService) {}

  @Post()
  create(
    @Request() req,
    @Body()
    createFeedbackFormDto: CreateFeedbackFormDto,
  ) {
    return this.feedbackFormService.create(
      req.user.organizationId,
      createFeedbackFormDto,
    );
  }

  @Get()
  findAll(@GetUserPayload() payload: Payload) {
    return this.feedbackFormService.findAllByOrganization(
      payload.organizationId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackFormService.findOne(id);
  }
}
