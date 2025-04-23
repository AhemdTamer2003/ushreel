import { configureStore } from "@reduxjs/toolkit";
import authRedcuer from "./Slices/authSlice";
import usherReducer from "./Slices/usherSlice";

const store = configureStore({
  reducer: {
    auth: authRedcuer,
    usher: usherReducer,
  },
});

export default store;
