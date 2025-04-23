import apiClient from "../../utils/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch usher profile
export const fetchUsherProfile = createAsyncThunk(
  "usher/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/usher/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch profile"
      );
    }
  }
);

// Update usher profile
export const updateUsherProfile = createAsyncThunk(
  "usher/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch("/usher/profile", profileData);
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

// Update usher experience
export const updateUsherExperience = createAsyncThunk(
  "usher/updateExperience",
  async (experience, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/usher/complete-profile", {
        experience,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update experience"
      );
    }
  }
);

// Upload profile picture
export const uploadProfilePicture = createAsyncThunk(
  "usher/uploadProfilePicture",
  async (pictureFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", pictureFile);

      const response = await apiClient.patch(
        "/usher/profile/upload-picture",
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
