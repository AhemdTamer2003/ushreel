import apiClient from "../../utils/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createJob = createAsyncThunk(
  "job/create",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/jobs", jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to create job"
      );
    }
  }
);

export const getRecommendedUshers = createAsyncThunk(
  "job/getRecommendedUshers",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/jobs/${jobId}/usher-selection`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
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
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to select ushers for job"
      );
    }
  }
);

// Get recommended content creators for selection
export const getRecommendedContentCreators = createAsyncThunk(
  "job/getRecommendedContentCreators",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/jobs/${jobId}/recommended-content-creators`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch recommended content creators"
      );
    }
  }
);

// Select content creators for a job
export const selectContentCreatorsForJob = createAsyncThunk(
  "job/selectContentCreators",
  async ({ jobId, selectedContentCreators }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/jobs/${jobId}/select-content-creators`,
        {
          selectedContentCreators,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to select content creators for job"
      );
    }
  }
);

// Create content job (for online marketing)
export const createContentJob = createAsyncThunk(
  "job/createContentJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/jobs/content-creators", jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to create content job"
      );
    }
  }
);

// Get job offer details
export const getJobOfferDetails = createAsyncThunk(
  "job/getJobOfferDetails",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/jobs/${jobId}/details`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch job offer details"
      );
    }
  }
);
