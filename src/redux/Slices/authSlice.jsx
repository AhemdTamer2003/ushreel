import { createSlice } from "@reduxjs/toolkit";
import { registerUshear } from "../Services/auth";

const authslice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUshear.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUshear.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUshear.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authslice.reducer;
