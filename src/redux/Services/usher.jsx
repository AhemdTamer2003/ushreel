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
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        const errorMessages = error.response.data.errors
          .map((err) => err.msg)
          .join(", ");
        return rejectWithValue(errorMessages);
      }

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
  async (experienceData, { rejectWithValue }) => {
    try {
      const experience =
        typeof experienceData === "string"
          ? experienceData
          : Array.isArray(experienceData)
          ? experienceData.join(", ")
          : "";

      console.log(`Sending experience update: "${experience}"`);

      // Update the experience text in the profile
      const response = await apiClient.patch("/usher/profile", {
        experience: experience,
      });

      // The backend will automatically call the AI service to analyze the text
      // and update experienceLevel and experienceRole fields
      // We return the full response which includes the updated profile with AI predictions
      console.log("Backend response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Experience update error:", error);
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

// Accept job offer
export const acceptOffer = createAsyncThunk(
  "usher/acceptOffer",
  async (offerId, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/usher/offers/${offerId}/accept`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to accept offer"
      );
    }
  }
);

// Decline job offer
export const declineOffer = createAsyncThunk(
  "usher/declineOffer",
  async (offerId, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/usher/offers/${offerId}/decline`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to decline offer"
      );
    }
  }
);
