import {
  HealthCheckResponse,
  RegisterData,
  User,
  OrganizationDetailsForm,
  DashboardStats,
  Organization,
  CreateFeedbackForm,
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
    getAll: async () => {
      return axios.get("/feedback-forms");
    },
    getOne: async (id: string) => {
      return axios.get(`/feedback-forms/${id}`);
    },
    update: async (
      id: string,
      data: Partial<{
        title: string;
        description: string;
        questions: {
          id: string;
          type: "text" | "rating" | "choice" | "boolean";
          question: string;
          required: boolean;
          options?: string[];
          minRating?: number;
          maxRating?: number;
        }[];
        isActive: boolean;
      }>
    ) => {
      return axios.patch(`/feedback-forms/${id}`, data);
    },
    delete: async (id: string) => {
      return axios.delete(`/feedback-forms/${id}`);
    },
  },
};
