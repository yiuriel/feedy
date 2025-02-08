import axios from "./axios";

type SubscriptionPlan = "free" | "pro";

interface User {
  id: string;
  email: string;
  hasCompletedOrgSetup: boolean;
}

interface DashboardStats {
  totalFeeds: number;
  activeSubscriptions: number;
  totalArticles: number;
}

interface OrganizationDetailsForm {
  name: string;
  description: string;
  industry: string;
  size: string;
}

interface RegisterData {
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

interface HealthCheckResponse {
  status: string;
  timestamp: string;
  version: string;
  environment: string;
}

export const api = {
  health: {
    check: async (): Promise<HealthCheckResponse> => {
      return axios.get("/health");
    },
  },
  auth: {
    register: async (data: RegisterData) => {
      return axios.post("/auth/register", data);
    },
    login: async (credentials: { email: string; password: string }) => {
      return axios.post("/auth/login", credentials);
    },
  },
  user: {
    getCurrentUser: async (): Promise<User> => {
      return axios.get("/user/me");
    },
  },
  organization: {
    submitDetails: async (data: OrganizationDetailsForm) => {
      return axios.post("/organization/details", data);
    },
  },
  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      return axios.get("/dashboard/stats");
    },
  },
};
