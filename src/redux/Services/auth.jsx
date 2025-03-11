import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUshear = createAsyncThunk(
    '/registersignup',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/register/usher`, formData);
            return response.data.User;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);
