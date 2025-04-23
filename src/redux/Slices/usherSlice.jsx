import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsherProfile,
  updateUsherProfile,
  updateUsherExperience,
  uploadProfilePicture,
} from "../Services/usher";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateStatus: "idle",
  updateError: null,
};

const usherSlice = createSlice({
  name: "usher",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.updateError = null;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchUsherProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsherProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.profile;
      })
      .addCase(fetchUsherProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Profile
    builder
      .addCase(updateUsherProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateUsherProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.profile = action.payload.profile;
      })
      .addCase(updateUsherProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });

    // Update Experience
    builder
      .addCase(updateUsherExperience.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateUsherExperience.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.profile = action.payload.profile;
      })
      .addCase(updateUsherExperience.rejected, (state, action) => {
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
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });
  },
});

export const { clearErrors, resetUpdateStatus } = usherSlice.actions;
export default usherSlice.reducer;
