import apiClient from "../../utils/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create a new job
export const createJob = createAsyncThunk(
  "job/create",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/jobs", jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to create job"
      );
    }
  }
);

// Get recommended ushers for job selection
export const getRecommendedUshers = createAsyncThunk(
  "job/getRecommendedUshers",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/jobs/${jobId}/usher-selection`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch recommended ushers"
      );
    }
  }
);

// Select ushers for a job
export const selectUshersForJob = createAsyncThunk(
  "job/selectUshers",
  async ({ jobId, selectedUshers }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/jobs/${jobId}/usher-selection`, {
        selectedUshers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to select ushers for job"
      );
    }
  }
);
