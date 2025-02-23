import { QuestionType } from '../../common/enums/question-type.enum';

export class CreateFeedbackFormQuestionDto {
  type: QuestionType;
  question: string;
  required: boolean;
  options?: string[];
  minRating?: number;
  maxRating?: number;
}
