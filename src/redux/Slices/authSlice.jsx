// src/redux/Slices/authSlice.jsx

import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  addExperience,
  registerUshear,
  logout as logoutService,
} from "../Services/auth.jsx"; // Note the .jsx extension

// Helper function to safely parse JSON
const safeJSONParse = (data) => {
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};

// Helper function to safely get local storage item
const getLocalStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error accessing localStorage for key ${key}:`, error);
    return null;
  }
};

// Helper function to safely set local storage item
const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value)
    );
    return true;
  } catch (error) {
    console.error(`Error setting localStorage for key ${key}:`, error);
    return false;
  }
};

// Get initial user data
const initialUser = safeJSONParse(getLocalStorageItem("user"));

// Initial state with safe JSON parsing
const initialState = {
  user: initialUser,
  token: getLocalStorageItem("token"),
  isAuthenticated: !!getLocalStorageItem("token"),
  loading: false,
  error: null,
  isOtpSent: false,
  resetSuccess: false,
  message: null,
  isEmailVerified: initialUser?.isEmailVerified || false,
  hasAddedExperience: initialUser?.hasAddedExperience || false,
  registrationSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetState: (state) => {
      state.isOtpSent = false;
      state.resetSuccess = false;
      state.error = null;
      state.message = null;
      state.registrationSuccess = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isEmailVerified = false;
      state.hasAddedExperience = false;
      state.error = null;
      state.message = null;
      logoutService();
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isEmailVerified = action.payload?.isEmailVerified || false;
      state.hasAddedExperience = action.payload?.hasAddedExperience || false;
      setLocalStorageItem("user", action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      setLocalStorageItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUshear.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUshear.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.message = "Registration successful! Please verify your email.";
        if (action.payload?.user) {
          state.user = action.payload.user;
          setLocalStorageItem("user", action.payload.user);
        }
      })
      .addCase(registerUshear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationSuccess = false;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.isEmailVerified = action.payload.user?.isEmailVerified || false;
          state.hasAddedExperience =
            action.payload.user?.hasAddedExperience || false;
          state.error = null;
          state.message = action.payload.message || "Login successful!";

          setLocalStorageItem("user", action.payload.user);
          setLocalStorageItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })

      // Email verification cases
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.isEmailVerified = true;
        if (state.user) {
          state.user.isEmailVerified = true;
          setLocalStorageItem("user", state.user);
        }
        state.message = "Email verified successfully";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot Password cases
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isOtpSent = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.isOtpSent = true;
        state.message = "OTP sent successfully to your email";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isOtpSent = false;
      })

      // Reset Password cases
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetSuccess = true;
        state.message = "Password reset successfully";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.resetSuccess = false;
      })

      // Add Experience cases
      .addCase(addExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExperience.fulfilled, (state) => {
        state.loading = false;
        state.hasAddedExperience = true;
        if (state.user) {
          state.user.hasAddedExperience = true;
          setLocalStorageItem("user", state.user);
        }
        state.message = "Experience added successfully";
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearError,
  clearMessage,
  resetState,
  logout,
  setUser,
  setToken,
} = authSlice.actions;

// Export selector
export const selectAuth = (state) => state.auth;

// Export reducer
export default authSlice.reducer;

// Re-export the async actions
export {
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  addExperience,
  registerUshear,
} from "../Services/auth.jsx";
