import axios from "axios";

// In development, we use Vite's proxy (configured in vite.config.ts)
// In production, the nginx configuration handles the routing
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  // Add reasonable timeout
  timeout: 10000,
  withCredentials: true,
});

// Add a request interceptor for handling loading states and auth tokens
axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized access
        return Promise.reject(error);
      }
      throw new Error(error.response.data.message || "An error occurred");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up the request");
    }
  }
);

export default axiosInstance;
