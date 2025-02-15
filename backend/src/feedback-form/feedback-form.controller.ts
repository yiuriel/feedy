import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateFeedbackFormDto } from './dto/create-feedback-form.dto';
import { FeedbackFormService } from './feedback-form.service';
import { GetUserPayload } from 'src/auth/decorators/get.user.payload';
import { Payload } from 'src/auth/types/payload.type';
import { Response } from 'express';

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
  findOne(
    @Param('id') accessToken: string,
    @GetUserPayload() payload: Payload,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.feedbackFormService.findOne(
      accessToken,
      payload.organizationId,
      res,
    );
  }

  @Get(':id/evaluate')
  evaluate(
    @Param('id') accessToken: string,
    @GetUserPayload() payload: Payload,
  ) {
    return this.feedbackFormService.getFormWithResponses(
      accessToken,
      payload.organizationId,
    );
  }

  @Get(':id/password')
  needsPassword(
    @Param('id') accessToken: string,
    @GetUserPayload() payload: Payload,
  ) {
    return this.feedbackFormService.formNeedsPassword(
      accessToken,
      payload.organizationId,
    );
  }

  @Post(':id/password')
  checkPassword(
    @Param('id') accessToken: string,
    @Body() { password }: { password: string },
  ) {
    return this.feedbackFormService.checkPassword(accessToken, password);
  }
}
