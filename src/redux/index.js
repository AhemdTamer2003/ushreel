import { configureStore } from "@reduxjs/toolkit";
import authRedcuer from "./Slices/authSlice";
import usherReducer from "./Slices/usherSlice";
import contentCreatorReducer from "./Slices/contentCreatorSlice";
const store = configureStore({
  reducer: {
    auth: authRedcuer,
    usher: usherReducer,
    contentCreator: contentCreatorReducer,
  },
});

export default store;
