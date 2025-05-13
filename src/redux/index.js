import { configureStore } from "@reduxjs/toolkit";
import authRedcuer from "./Slices/authSlice";
import usherReducer from "./Slices/usherSlice";
import contentCreatorReducer from "./Slices/contentCreatorSlice";
import companyReducer from "./Slices/companySlice";
import jobReducer from "./Slices/jobSlice";
import adminReducer from "./Slices/adminSlice";

const store = configureStore({
  reducer: {
    auth: authRedcuer,
    usher: usherReducer,
    contentCreator: contentCreatorReducer,
    company: companyReducer,
    job: jobReducer,
    admin: adminReducer,
  },
});

export default store;
