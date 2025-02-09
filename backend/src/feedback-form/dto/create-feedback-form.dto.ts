import { CreateFeedbackFormQuestionDto } from './create-feedback-form.question.dto';

export type CreateFeedbackFormDto = {
  title: string;
  description?: string;
  questions: CreateFeedbackFormQuestionDto[];
};
