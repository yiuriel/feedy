export type SubscriptionPlan = "free" | "pro";

export interface User {
  id: string;
  email: string;
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
