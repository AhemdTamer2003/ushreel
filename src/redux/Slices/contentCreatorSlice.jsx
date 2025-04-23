import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContentCreatorProfile,
  updateContentCreatorProfile,
  uploadProfilePicture,
} from "../Services/contentCreator";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateStatus: "idle",
  updateError: null,
};

const contentCreatorSlice = createSlice({
  name: "contentCreator",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.updateError = null;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchContentCreatorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentCreatorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
        state.error = null;
      })
      .addCase(fetchContentCreatorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      });

    // Update Profile
    builder
      .addCase(updateContentCreatorProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateContentCreatorProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.profile = action.payload.profile;
        state.updateError = null;
      })
      .addCase(updateContentCreatorProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });

    // Upload Profile Picture
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        if (action.payload.profile) {
          state.profile = action.payload.profile;
        } else if (action.payload.profilePicture) {
          state.profile = {
            ...state.profile,
            profilePicture: action.payload.profilePicture,
          };
        }
        state.updateError = null;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });
  },
});

export const { clearErrors, resetUpdateStatus } = contentCreatorSlice.actions;


export default contentCreatorSlice.reducer;
