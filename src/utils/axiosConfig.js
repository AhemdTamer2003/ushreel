import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASEURL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (config.url === "/auth/admin/register") {
      console.log("Skipping token for admin registration");
    } else if (
      config.url.startsWith("/admin") ||
      config.url.startsWith("/auth/admin")
    ) {
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    console.log("API Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error Response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      // Handle authentication errors
      if (error.response.status === 401 || error.response.status === 403) {
        // Check if error has a specific invalid token message
        if (error.response.data?.message?.includes("Invalid token")) {
          console.log("Invalid token detected. Clearing auth data...");

          // Check if the request was for an admin route
          const isAdminRoute =
            error.config.url.startsWith("/admin") ||
            error.config.url.startsWith("/auth/admin");

          if (isAdminRoute) {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminData");
            if (window.location.pathname.startsWith("/admin")) {
              window.location.href = "/admin/login";
            }
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            if (!window.location.pathname.startsWith("/admin")) {
              window.location.href = "/login";
            }
          }
        }
      }
    } else if (error.request) {
      console.error("API Request Error:", error.request);
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
