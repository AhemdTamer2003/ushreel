// src/redux/Services/auth.jsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Auth Actions
const registerUshear = createAsyncThunk(
  'auth/registerUshear',
  async (formData, { rejectWithValue }) => {
    try {
      console.log('Registration Request:', formData);

      const response = await api.post("/auth/register/usher", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        phone: formData.phone,
        birthdate: formData.birthdate,
        role: formData.role
      });
      localStorage.setItem("verificationEmail", formData.email);
      console.log('Registration Response:', response.data);

      if (!response.data) {
        throw new Error('No response data received');
      }

      return response.data;
    } catch (error) {
      console.error('Registration Error:', error);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Registration failed"
      );
    }
  }
);

const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      console.log('Login Request:', formData);

      const response = await api.post("/auth/login", {
        emailOrPhoneOrUsername: formData.emailOrPhoneOrUsername,
        password: formData.password
      });

      console.log('Login Response:', response.data);

      if (!response.data) {
        throw new Error('No response data received');
      }

      // Store auth data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('email', formData.emailOrPhoneOrUsername);

      // Update axios default headers
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      return response.data;

    } catch (error) {
      console.error('Login Error:', error);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );
    }
  }
);

const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ email, verificationCode }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/verify-email", {
        email,
        verificationCode
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Email verification failed");
    }
  }
);

const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to process request");
    }
  }
);

const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/reset-password", resetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to reset password");
    }
  }
);

const addExperience = createAsyncThunk(
  'usher/addExperience',
  async (experience, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(`${import.meta.env.VITE_BASEURL}/usher/complete-profile`, {
        experience
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update user data in localStorage
      try {
        const user = getCurrentUser();
        if (user) {
          user.hasAddedExperience = true;
          localStorage.setItem('user', JSON.stringify(user));
        }
      } catch (error) {
        console.error('Error updating user experience status:', error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add experience");
    }
  }
);

// Helper Functions
const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

const logout = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    delete api.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

// Export everything
export {
  registerUshear,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  addExperience,
  isAuthenticated,
  getCurrentUser,
  logout
};

export default api;