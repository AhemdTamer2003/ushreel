import { createSlice } from "@reduxjs/toolkit";
import {
  registerAdmin,
  loginAdmin,
  adminLogout,
  getAllUsers,
  getPendingJobs,
  approveJob,
  rejectJob,
} from "../Services/admin";

const safelyParseJSON = (json) => {
  try {
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return null;
  }
};

const adminData = localStorage.getItem("adminData");
const initialState = {
  admin: safelyParseJSON(adminData),
  isAdminAuthenticated: !!localStorage.getItem("adminToken"),
  loading: false,
  error: null,
  users: {
    ushers: [],
    contentCreators: [],
    companies: [],
    loading: false,
    error: null,
  },
  pendingJobs: {
    data: [],
    loading: false,
    error: null,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminErrors: (state) => {
      state.error = null;
      state.users.error = null;
      state.pendingJobs.error = null;
    },
  },
  extraReducers: (builder) => {
    // Admin Register
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.isAdminAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Admin Logout
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null;
        state.isAdminAuthenticated = false;
      })

      // Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.users.loading = true;
        state.users.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.ushers = action.payload.ushers || [];
        state.users.contentCreators = action.payload.contentCreators || [];
        state.users.companies = action.payload.companies || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.users.loading = false;
        state.users.error = action.payload;
      })

      // Get Pending Jobs
      .addCase(getPendingJobs.pending, (state) => {
        state.pendingJobs.loading = true;
        state.pendingJobs.error = null;
      })
      .addCase(getPendingJobs.fulfilled, (state, action) => {
        state.pendingJobs.loading = false;
        state.pendingJobs.data = action.payload || [];
      })
      .addCase(getPendingJobs.rejected, (state, action) => {
        state.pendingJobs.loading = false;
        state.pendingJobs.error = action.payload;
      })

      // Approve Job
      .addCase(approveJob.fulfilled, (state, action) => {
        state.pendingJobs.data = state.pendingJobs.data.filter(
          (job) => job._id !== action.payload.jobId
        );
      })

      // Reject Job
      .addCase(rejectJob.fulfilled, (state, action) => {
        state.pendingJobs.data = state.pendingJobs.data.filter(
          (job) => job._id !== action.payload.jobId
        );
      });
  },
});

export const { clearAdminErrors } = adminSlice.actions;
export default adminSlice.reducer;
