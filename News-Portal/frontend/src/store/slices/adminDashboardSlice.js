import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// ================= THUNKS =================

export const fetchDashboard = createAsyncThunk(
  "admin/dashboard",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/dashboard");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const fetchMonthlyRevenue = createAsyncThunk(
  "admin/monthlyRevenue",
  async () => {
    const res = await API.get("/admin/analytics/revenue/monthly");
    return res.data;
  }
);

export const fetchTopCampaigns = createAsyncThunk(
  "admin/topCampaigns",
  async () => {
    const res = await API.get("/admin/analytics/top-campaigns");
    return res.data;
  }
);

export const fetchLocationAnalytics = createAsyncThunk(
  "admin/location",
  async () => {
    const res = await API.get("/admin/analytics/location");
    return res.data;
  }
);

// ================= SLICE =================

const adminSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    dashboard: null,
    revenue: [],
    campaigns: [],
    location: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchMonthlyRevenue.fulfilled, (state, action) => {
        state.revenue = action.payload;
      })
      .addCase(fetchTopCampaigns.fulfilled, (state, action) => {
        state.campaigns = action.payload;
      })
      .addCase(fetchLocationAnalytics.fulfilled, (state, action) => {
        state.location = action.payload;
      });
  },
});

export default adminSlice.reducer;