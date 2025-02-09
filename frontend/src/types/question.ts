export enum QuestionType {
  TEXT = "text",
  RATING = "rating",
  CHOICE = "choice",
  BOOLEAN = "boolean",
}

export interface FeedbackFormQuestionState {
  id?: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[];
  minRating?: number;
  maxRating?: number;
}

export interface FeedbackFormState {
  id?: string;
  title: string;
  description?: string;
  questions: FeedbackFormQuestionState[];
}
