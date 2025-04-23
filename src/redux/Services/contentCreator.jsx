import apiClient from "../../utils/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch content creator profile
export const fetchContentCreatorProfile = createAsyncThunk(
  "contentCreator/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/content-creator/profile");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch profile"
      );
    }
  }
);

// Update content creator profile
export const updateContentCreatorProfile = createAsyncThunk(
  "contentCreator/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(
        "/content-creator/profile",
        profileData
      );
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
  "contentCreator/uploadProfilePicture",
  async (pictureFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", pictureFile);

      const response = await apiClient.patch(
        "/content-creator/profile/upload-picture",
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
