export type CreateFeedbackFormQuestionDto = {
  type: 'text' | 'rating' | 'multiple_choice' | 'checkbox';
  question: string;
  required: boolean;
  options?: string[];
  minRating?: number;
  maxRating?: number;
};
