import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

export const fetchRevenue = createAsyncThunk(
  "admin/manage-revenue",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/analytics/revenue");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
export const fetchTopCampaigns = createAsyncThunk(
  "admin/top-campaigns/revenue",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/analytics/top-campaigns/revenue");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error fetching campaigns"
      );
    }
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
     topCampaigns: [],
    campaigns: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchRevenue.rejected, (state) => {
        state.loading = false;
      })
       .addCase(fetchTopCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.topCampaigns = action.payload;
      })
      .addCase(fetchTopCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default revenueSlice.reducer;