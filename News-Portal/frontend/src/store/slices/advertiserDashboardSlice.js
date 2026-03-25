import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

export const getAdvertiserDashboard = createAsyncThunk(
  "advertiser/dashboard",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/advertiser-dashboard");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const advertiserDashboardSlice = createSlice({
  name: "advertiserDashboard",
  initialState: {
    dashboard: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdvertiserDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdvertiserDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getAdvertiserDashboard.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default advertiserDashboardSlice.reducer;