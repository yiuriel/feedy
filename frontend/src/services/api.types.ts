export type SubscriptionPlan = "free" | "pro";

export interface User {
  id: string;
  email: string;
  hasCompletedOrgSetup: boolean;
}

export interface DashboardStats {
  totalFeeds: number;
  activeSubscriptions: number;
  totalArticles: number;
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
