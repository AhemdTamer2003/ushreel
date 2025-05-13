import { createSlice } from "@reduxjs/toolkit";
import {
  createJob,
  getRecommendedUshers,
  selectUshersForJob,
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
  offerId: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    clearJobErrors: (state) => {
      state.createJobError = null;
      state.recommendedUshersError = null;
      state.selectUshersError = null;
    },
    resetJobState: (state) => {
      state.jobData = null;
      state.recommendedUshers = [];
      state.selectedUshers = [];
      state.offerId = null;
    },
    updateSelectedUshers: (state, action) => {
      state.selectedUshers = action.payload;
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
      });
  },
});

export const { clearJobErrors, resetJobState, updateSelectedUshers } =
  jobSlice.actions;
export default jobSlice.reducer;
