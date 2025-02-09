export enum QuestionType {
  TEXT = 'text',
  RATING = 'rating',
  CHOICE = 'choice',
  BOOLEAN = 'boolean',
}

export interface Question {
  id?: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[];
  minRating?: number;
  maxRating?: number;
}

export interface FeedbackForm {
  id?: string;
  title: string;
  description?: string;
  questions: Question[];
}
