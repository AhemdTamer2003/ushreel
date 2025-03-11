import { configureStore } from "@reduxjs/toolkit";
import authRedcuer from './Slices/authSlice'
const store = configureStore({
    reducer: {
        auth: authRedcuer
    }
});
export default store;