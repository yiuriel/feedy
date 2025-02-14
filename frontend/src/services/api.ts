import {
  CreateFeedbackForm,
  CreateFeedbackResponseDto,
  DashboardStats,
  FeedbackForm,
  HealthCheckResponse,
  Organization,
  OrganizationDetailsForm,
  RegisterData,
  User,
} from "./api.types";
import axios from "./axios";

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
    verify: async () => {
      return axios.get("/auth/verify");
    },
    logout: async () => {
      return axios.post("/auth/logout");
    },
  },
  user: {
    getCurrentUser: async (): Promise<User> => {
      return axios.get("/user/me");
    },
  },
  organization: {
    orgNeedsDetails: async (): Promise<boolean> => {
      return axios.get("/organization/need-details");
    },
    submitDetails: async (data: OrganizationDetailsForm) => {
      return axios.post("/organization/details", data);
    },
    getOrganization: async (): Promise<Organization> => {
      return axios.get("/organization");
    },
  },
  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      return axios.get("/dashboard/stats");
    },
  },
  feedbackForm: {
    create: async (data: CreateFeedbackForm) => {
      return axios.post("/feedback-forms", data);
    },
    getAll: async (): Promise<FeedbackForm[]> => {
      return axios.get("/feedback-forms");
    },
    getOne: async (accessToken: string): Promise<FeedbackForm> => {
      return axios.get(`/feedback-forms/${accessToken}`);
    },
    needsPassword: async (accessToken: string): Promise<boolean> => {
      return axios.get(`/feedback-forms/${accessToken}/password`);
    },
    checkPassword: async (
      accessToken: string,
      password: string
    ): Promise<boolean> => {
      return axios.post(`/feedback-forms/${accessToken}/password`, {
        password,
      });
    },
  },
  feedbackResponse: {
    create: async (data: CreateFeedbackResponseDto) => {
      return axios.post("/feedback-responses", data);
    },
  },
};
