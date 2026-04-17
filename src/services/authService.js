import axios from "axios";

// Use environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect
      localStorage.removeItem("authToken");
      localStorage.removeItem("admin_email");
      localStorage.removeItem("admin_role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth API calls
export const authService = {
  /**
   * Login with email and password
   * @param {string} email - Admin email
   * @param {string} password - Admin password
   * @returns {Promise} - Contains token and admin data
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to connect to server. Please try again.",
        }
      );
    }
  },

  /**
   * Logout - clear stored credentials
   */
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_role");
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authToken exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },

  /**
   * Get stored admin info
   * @returns {Object} - Admin data or null
   */
  getAdminInfo: () => {
    return {
      email: localStorage.getItem("admin_email"),
      role: localStorage.getItem("admin_role"),
    };
  },

  /**
   * Store auth tokens after successful login
   * @param {Object} data - Response data from login endpoint
   */
  storeAuthData: (data) => {
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }
    if (data.admin?.email) {
      localStorage.setItem("admin_email", data.admin.email);
    }
    if (data.admin?.role) {
      localStorage.setItem("admin_role", data.admin.role);
    }
  },
};

export default authService;
