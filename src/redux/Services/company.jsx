import apiClient from "../../utils/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch company profile
export const fetchCompanyProfile = createAsyncThunk(
  "company/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/company/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch company profile"
      );
    }
  }
);

// Update company profile
export const updateCompanyProfile = createAsyncThunk(
  "company/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch("/company/profile", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile"
      );
    }
  }
);

// Upload profile picture
export const uploadProfilePicture = createAsyncThunk(
  "company/uploadProfilePicture",
  async (pictureFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", pictureFile);

      const response = await apiClient.patch(
        "/company/profile/upload-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload profile picture"
      );
    }
  }
);
