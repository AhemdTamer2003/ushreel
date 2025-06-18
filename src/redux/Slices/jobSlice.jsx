import { createSlice } from "@reduxjs/toolkit";
import {
  createJob,
  createContentJob,
  getRecommendedUshers,
  getRecommendedContentCreators,
  selectUshersForJob,
  selectContentCreatorsForJob,
  getJobOfferDetails,
} from "../Services/job";

const initialState = {
  createJobLoading: false,
  createJobError: null,
  jobData: null,
  recommendedUshers: [],
  selectedUshers: [],
  recommendedUshersLoading: false,
  recommendedUshersError: null,
  selectUshersLoading: false,
  selectUshersError: null,

  // Content creator related state
  createContentJobLoading: false,
  createContentJobError: null,
  recommendedContentCreators: {},
  selectedContentCreators: [],
  recommendedContentCreatorsLoading: false,
  recommendedContentCreatorsError: null,
  selectContentCreatorsLoading: false,
  selectContentCreatorsError: null,

  // Job offer details
  jobOfferDetails: null,
  jobOfferDetailsLoading: false,
  jobOfferDetailsError: null,

  offerId: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearJobErrors: (state) => {
      state.createJobError = null;
      state.createContentJobError = null;
      state.recommendedUshersError = null;
      state.recommendedContentCreatorsError = null;
      state.selectUshersError = null;
      state.selectContentCreatorsError = null;
      state.jobOfferDetailsError = null;
    },
    resetJobState: (state) => {
      state.jobData = null;
      state.recommendedUshers = [];
      state.recommendedContentCreators = {};
      state.selectedUshers = [];
      state.selectedContentCreators = [];
      state.jobOfferDetails = null;
      state.offerId = null;
    },
    updateSelectedUshers: (state, action) => {
      state.selectedUshers = action.payload;
    },
    updateSelectedContentCreators: (state, action) => {
      state.selectedContentCreators = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create job reducers
    builder
      .addCase(createJob.pending, (state) => {
        state.createJobLoading = true;
        state.createJobError = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.createJobLoading = false;
        state.jobData = action.payload;
        state.recommendedUshers = action.payload.recommendedUshers || [];
      })
      .addCase(createJob.rejected, (state, action) => {
        state.createJobLoading = false;
        state.createJobError = action.payload || "Failed to create job";
      })

      // Create content job reducers
      .addCase(createContentJob.pending, (state) => {
        state.createContentJobLoading = true;
        state.createContentJobError = null;
      })
      .addCase(createContentJob.fulfilled, (state, action) => {
        state.createContentJobLoading = false;
        state.jobData = action.payload;
        state.recommendedContentCreators =
          action.payload.recommendedContentCreators || {};
      })
      .addCase(createContentJob.rejected, (state, action) => {
        state.createContentJobLoading = false;
        state.createContentJobError =
          action.payload || "Failed to create content job";
      })

      // Get recommended ushers reducers
      .addCase(getRecommendedUshers.pending, (state) => {
        state.recommendedUshersLoading = true;
        state.recommendedUshersError = null;
      })
      .addCase(getRecommendedUshers.fulfilled, (state, action) => {
        state.recommendedUshersLoading = false;
        state.recommendedUshers = action.payload.recommendedUshers || [];
      })
      .addCase(getRecommendedUshers.rejected, (state, action) => {
        state.recommendedUshersLoading = false;
        state.recommendedUshersError =
          action.payload || "Failed to fetch recommended ushers";
      })

      // Get recommended content creators reducers
      .addCase(getRecommendedContentCreators.pending, (state) => {
        state.recommendedContentCreatorsLoading = true;
        state.recommendedContentCreatorsError = null;
      })
      .addCase(getRecommendedContentCreators.fulfilled, (state, action) => {
        state.recommendedContentCreatorsLoading = false;
        state.recommendedContentCreators =
          action.payload.recommendedContentCreators || {};
      })
      .addCase(getRecommendedContentCreators.rejected, (state, action) => {
        state.recommendedContentCreatorsLoading = false;
        state.recommendedContentCreatorsError =
          action.payload || "Failed to fetch recommended content creators";
      })

      // Select ushers reducers
      .addCase(selectUshersForJob.pending, (state) => {
        state.selectUshersLoading = true;
        state.selectUshersError = null;
      })
      .addCase(selectUshersForJob.fulfilled, (state, action) => {
        state.selectUshersLoading = false;
        state.offerId = action.payload.offerId;
      })
      .addCase(selectUshersForJob.rejected, (state, action) => {
        state.selectUshersLoading = false;
        state.selectUshersError = action.payload || "Failed to select ushers";
      })

      // Select content creators reducers
      .addCase(selectContentCreatorsForJob.pending, (state) => {
        state.selectContentCreatorsLoading = true;
        state.selectContentCreatorsError = null;
      })
      .addCase(selectContentCreatorsForJob.fulfilled, (state, action) => {
        state.selectContentCreatorsLoading = false;
        state.offerId = action.payload.offerId;
      })
      .addCase(selectContentCreatorsForJob.rejected, (state, action) => {
        state.selectContentCreatorsLoading = false;
        state.selectContentCreatorsError =
          action.payload || "Failed to select content creators";
      })

      // Get job offer details reducers
      .addCase(getJobOfferDetails.pending, (state) => {
        state.jobOfferDetailsLoading = true;
        state.jobOfferDetailsError = null;
      })
      .addCase(getJobOfferDetails.fulfilled, (state, action) => {
        state.jobOfferDetailsLoading = false;
        state.jobOfferDetails = action.payload;
      })
      .addCase(getJobOfferDetails.rejected, (state, action) => {
        state.jobOfferDetailsLoading = false;
        state.jobOfferDetailsError =
          action.payload || "Failed to fetch job offer details";
      });
  },
});

export const {
  clearJobErrors,
  resetJobState,
  updateSelectedUshers,
  updateSelectedContentCreators,
} = jobSlice.actions;
export default jobSlice.reducer;
