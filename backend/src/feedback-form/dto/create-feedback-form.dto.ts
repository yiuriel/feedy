import { CreateFeedbackFormQuestionDto } from './create-feedback-form.question.dto';

export type CreateFeedbackFormDto = {
  title: string;
  description?: string;
  questions: CreateFeedbackFormQuestionDto[];
  password?: string;
  customThankYouPage?: string;
  settings?: {
    stepped?: boolean;
    allowMultipleResponses?: boolean;
  };
};
