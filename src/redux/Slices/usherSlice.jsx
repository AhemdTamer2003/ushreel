import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUsherProfile,
  updateUsherProfile,
  updateUsherExperience,
  uploadProfilePicture,
  acceptOffer,
  declineOffer,
} from "../Services/usher";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateStatus: "idle",
  updateError: null,
  lastFetched: null,
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
    setLastFetched: (state, action) => {
      state.lastFetched = action.payload || Date.now();
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
        state.lastFetched = Date.now();
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

    // Accept Offer
    builder
      .addCase(acceptOffer.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(acceptOffer.fulfilled, (state) => {
        state.updateStatus = "succeeded";
        // Refresh the profile to get updated job lists
        state.lastFetched = null;
      })
      .addCase(acceptOffer.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });

    // Decline Offer
    builder
      .addCase(declineOffer.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(declineOffer.fulfilled, (state) => {
        state.updateStatus = "succeeded";
        // Refresh the profile to get updated job lists
        state.lastFetched = null;
      })
      .addCase(declineOffer.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });
  },
});

export const { clearErrors, resetUpdateStatus, setLastFetched } =
  usherSlice.actions;
export default usherSlice.reducer;
