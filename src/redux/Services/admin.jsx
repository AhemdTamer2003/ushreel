import apiClient from "../../utils/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Admin register
export const registerAdmin = createAsyncThunk(
  "admin/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/admin/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to register admin"
      );
    }
  }
);

// Admin login
export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/admin/login", credentials);

      // Store token in localStorage
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminData", JSON.stringify(response.data.admin));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Admin login failed"
      );
    }
  }
);

// Fetch all users (ushers, content creators, companies)
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/admin/users");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch users"
      );
    }
  }
);

// Fetch pending jobs
export const getPendingJobs = createAsyncThunk(
  "admin/getPendingJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/admin/jobs/pending");
      return response.data.jobs;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch pending jobs"
      );
    }
  }
);

// Approve job
export const approveJob = createAsyncThunk(
  "admin/approveJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/admin/jobs/${jobId}/approve`);
      return { ...response.data, jobId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to approve job"
      );
    }
  }
);

// Reject job
export const rejectJob = createAsyncThunk(
  "admin/rejectJob",
  async ({ jobId, comment }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/admin/jobs/${jobId}/reject`, {
        comment,
      });
      return { ...response.data, jobId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to reject job"
      );
    }
  }
);

// Admin logout
export const adminLogout = createAsyncThunk("admin/logout", async () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");
  return true;
});
