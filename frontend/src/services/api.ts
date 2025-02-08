import {
  HealthCheckResponse,
  RegisterData,
  User,
  OrganizationDetailsForm,
  DashboardStats,
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
