export type CreateFeedbackFormQuestionDto = {
  type: 'text' | 'rating' | 'multipleChoice' | 'checkbox';
  question: string;
  required: boolean;
  options?: string[];
  minRating?: number;
  maxRating?: number;
};
