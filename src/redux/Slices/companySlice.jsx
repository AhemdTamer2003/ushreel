import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCompanyProfile,
  updateCompanyProfile,
  uploadProfilePicture,
} from "../Services/company";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateStatus: "idle",
  updateError: null,
};

const companySlice = createSlice({
  name: "company",
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
      .addCase(fetchCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      });

    // Update Profile
    builder
      .addCase(updateCompanyProfile.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateCompanyProfile.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        if (action.payload.company) {
          state.profile = {
            ...state.profile,
            ...action.payload.company,
          };
        }
        state.updateError = null;
      })
      .addCase(updateCompanyProfile.rejected, (state, action) => {
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
        if (action.payload.company) {
          state.profile = {
            ...state.profile,
            ...action.payload.company,
          };
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

export const { clearErrors, resetUpdateStatus } = companySlice.actions;
export default companySlice.reducer;
