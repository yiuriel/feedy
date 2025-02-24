import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateFeedbackFormDto } from './dto/create-feedback-form.dto';
import { UpdateFeedbackFormDto } from './dto/update-feedback-form.dto';
import { UpdateFeedbackFormPasswordDto } from './dto/update-feedback-form-password.dto';
import { FeedbackFormService } from './feedback-form.service';
import { Response, Request } from 'express';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUserPayload } from 'src/auth/decorators/get.user.payload';
import { Payload } from 'src/auth/types/payload.type';

@Throttle({
  default: {
    limit: 15,
    ttl: 60000, // 1 minute
  },
})
@Controller('feedback-forms')
@UseGuards(AuthGuard)
export class FeedbackFormController {
  constructor(private readonly feedbackFormService: FeedbackFormService) {}

  @Post()
  create(
    @GetUserPayload() payload: Payload,
    @Body()
    createFeedbackFormDto: CreateFeedbackFormDto,
  ) {
    return this.feedbackFormService.create(
      payload.organizationId,
      createFeedbackFormDto,
    );
  }

  @Get('responses-over-time')
  async getResponsesOverTime(@GetUserPayload() payload: Payload) {
    return this.feedbackFormService.getResponsesOverTime(
      payload.organizationId,
    );
  }

  @Get('question-types-distribution')
  async getQuestionTypesDistribution(@GetUserPayload() payload: Payload) {
    return this.feedbackFormService.getQuestionTypesDistribution(
      payload.organizationId,
    );
  }

  @Get('rating-questions-average')
  async getRatingQuestionsAverage(@GetUserPayload() payload: Payload) {
    return this.feedbackFormService.getRatingQuestionsAverage(
      payload.organizationId,
    );
  }

  @Get()
  findAll(@GetUserPayload() payload: Payload) {
    return this.feedbackFormService.findAllByOrganization(
      payload.organizationId,
    );
  }

  @Get(':accessToken')
  findOne(
    @Param('accessToken') accessToken: string,
    @GetUserPayload() payload: Payload,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.feedbackFormService.findOne(
      accessToken,
      payload.organizationId,
      res,
    );
  }

  @Patch(':accessToken')
  update(
    @Param('accessToken') accessToken: string,
    @GetUserPayload() payload: Payload,
    @Body() updateFeedbackFormDto: UpdateFeedbackFormDto,
  ) {
    return this.feedbackFormService.update(
      accessToken,
      payload.organizationId,
      updateFeedbackFormDto,
    );
  }

  @Patch(':accessToken/password')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Param('accessToken') accessToken: string,
    @Body() updateFeedbackFormPasswordDto: UpdateFeedbackFormPasswordDto,
    @GetUserPayload() { organizationId }: Payload,
  ) {
    return this.feedbackFormService.updatePassword(
      accessToken,
      organizationId,
      updateFeedbackFormPasswordDto,
    );
  }

  @Delete(':accessToken')
  remove(
    @Param('accessToken') accessToken: string,
    @GetUserPayload() payload: Payload,
  ) {
    return this.feedbackFormService.remove(accessToken, payload.organizationId);
  }

  @Get(':accessToken/evaluate')
  evaluate(
    @Param('accessToken') accessToken: string,
    @GetUserPayload() payload: Payload,
  ) {
    return this.feedbackFormService.getFormWithResponses(
      accessToken,
      payload.organizationId,
    );
  }

  @Get(':accessToken/password')
  needsPassword(
    @Param('accessToken') accessToken: string,
    @GetUserPayload() payload: Payload,
    @Req() req: Request,
  ) {
    return this.feedbackFormService.formNeedsPassword(
      accessToken,
      payload.organizationId,
      req.ip,
    );
  }

  @Post(':accessToken/password')
  checkPassword(
    @Param('accessToken') accessToken: string,
    @Body() { password }: { password: string },
    @Req() req: Request,
  ) {
    return this.feedbackFormService.checkPassword(
      accessToken,
      password,
      req.ip,
    );
  }
}
