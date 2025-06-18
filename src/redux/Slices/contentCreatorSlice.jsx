import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContentCreatorProfile,
  updateContentCreatorProfile,
  uploadContentCreatorProfilePicture,
  acceptContentOffer,
  declineContentOffer,
} from "../Services/contentCreator";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateStatus: "idle",
  updateError: null,
  lastFetched: null,
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
    },
    setLastFetched: (state, action) => {
      state.lastFetched = action.payload || Date.now();
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
        state.lastFetched = Date.now();
      })
      .addCase(fetchContentCreatorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      })
      .addCase(updateContentCreatorProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });

    // Upload Profile Picture
    builder
      .addCase(uploadContentCreatorProfilePicture.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(
        uploadContentCreatorProfilePicture.fulfilled,
        (state, action) => {
          state.updateStatus = "succeeded";
          if (action.payload.profile) {
            state.profile = action.payload.profile;
          } else if (action.payload.profilePicture) {
            state.profile = {
              ...state.profile,
              profilePicture: action.payload.profilePicture,
            };
          }
        }
      )
      .addCase(uploadContentCreatorProfilePicture.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });

    // Accept Offer
    builder
      .addCase(acceptContentOffer.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(acceptContentOffer.fulfilled, (state) => {
        state.updateStatus = "succeeded";
        // Refresh the profile to get updated job lists
        state.lastFetched = null;
      })
      .addCase(acceptContentOffer.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });

    // Decline Offer
    builder
      .addCase(declineContentOffer.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(declineContentOffer.fulfilled, (state) => {
        state.updateStatus = "succeeded";
        // Refresh the profile to get updated job lists
        state.lastFetched = null;
      })
      .addCase(declineContentOffer.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });
  },
});

export const { clearErrors, resetUpdateStatus, setLastFetched } =
  contentCreatorSlice.actions;
export default contentCreatorSlice.reducer;
