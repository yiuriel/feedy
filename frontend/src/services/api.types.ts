export type SubscriptionPlan = "free" | "pro";

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  size: string;
  description: string;
}

export interface DashboardStats {
  activeForms: number;
  totalForms: number;
  totalResponses: number;
}

export interface OrganizationDetailsForm {
  name: string;
  description: string;
  industry: string;
  size: string;
}

export interface RegisterData {
  user: {
    email: string;
    password: string;
    name: string;
  };
  organization: {
    name: string;
  };
  subscription: {
    plan: SubscriptionPlan;
  };
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  version: string;
  environment: string;
}

export interface CreateFeedbackForm {
  title: string;
  description?: string;
  questions: CreateFeedbackFormQuestion[];
  password?: string;
  customThankYouPage?: string;
  settings?: {
    stepped?: boolean;
    allowMultipleResponses?: boolean;
  };
}

export interface CreateFeedbackFormQuestion {
  type: "text" | "rating" | "multiple_choice" | "checkbox";
  question: string;
  required: boolean;
  options?: string[];
  minRating?: number;
  maxRating?: number;
}

export interface FeedbackFormQuestion {
  id: string;
  type: "text" | "rating" | "multiple_choice" | "checkbox";
  question: string;
  required: boolean;
  options?: string[];
  minRating?: number;
  maxRating?: number;
}

export interface FeedbackForm {
  id: string;
  title: string;
  accessToken: string;
  description?: string;
  questions: FeedbackFormQuestion[];
  customThankYouPage?: string;
  formSettings?: {
    stepped?: boolean;
    allowMultipleResponses?: boolean;
  };
  createdAt: string;
  updatedAt: string;
  responseCount: number;
}

export type FeedbackResponseMetadata = {
  userAgent?: string;
};

export type FeedbackResponseAnswer = {
  questionId: string;
  textAnswer?: string;
  ratingAnswer?: number;
  selectedOptions?: string[];
};

export interface CreateFeedbackResponseDto {
  formId: string;
  answers: Array<FeedbackResponseAnswer>;
  metadata?: FeedbackResponseMetadata;
}

export interface FormResponsesOverTime {
  id: string;
  title: string;
  responses: {
    date: string;
  }[];
}

export interface QuestionTypeDistribution {
  type: string;
  count: number;
}

export interface RatingQuestionAverage {
  formTitle: string;
  question: string;
  average: number;
  totalResponses: number;
}
