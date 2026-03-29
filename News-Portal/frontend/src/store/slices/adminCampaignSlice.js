import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";
import { showToast } from "./uiMessageSlice";

// 🔹 Fetch all campaigns
export const fetchAllCampaigns = createAsyncThunk(
  "admin/manage-campaigns",
  async ({ page = 1 }, thunkAPI) => {
    try {
      const res = await API.get(`/admin/campaigns?page=${page}&limit=10`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔹 Fetch pending campaigns
export const fetchPendingCampaigns = createAsyncThunk(
  "admin/pendingCampaigns",
  async (_, thunkAPI) => {
    try {
      const res = await API.get(`/admin/pendingCampaigns`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔹 Approve campaign
export const approveCampaign = createAsyncThunk(
  "admin/approveCampaign",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/admin/approveCampaign/${id}`);
      thunkAPI.dispatch(
        showToast({ message: res.data.message, type: "success" })
      );
      return id;
    } catch (err) {
      thunkAPI.dispatch(
        showToast({ message: err.response?.data?.message, type: "error" })
      );
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔹 Reject campaign
export const rejectCampaign = createAsyncThunk(
  "admin/rejectCampaign",
  async ({ id, reason }, thunkAPI) => {
    try {
      const res = await API.put(`/admin/rejectCampaign/${id}`, { reason });
      thunkAPI.dispatch(
        showToast({ message: res.data.message, type: "success" })
      );
      return { id, reason };
    } catch (err) {
      thunkAPI.dispatch(
        showToast({ message: err.response?.data?.message, type: "error" })
      );
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const adminCampaignSlice = createSlice({
  name: "adminCampaigns",
  initialState: {
    campaigns: [],
    pending: [],
    loading: false,
    page: 1,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all campaigns
      .addCase(fetchAllCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload.campaigns || action.payload;
        state.page = action.payload.page || 1;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchPendingCampaigns.fulfilled, (state, action) => {
        state.pending = action.payload;
      })
      .addCase(approveCampaign.fulfilled, (state, action) => {
        const campaign = state.pending.find((c) => c._id === action.payload);
        if (campaign) campaign.status = "approved";
      })
      .addCase(rejectCampaign.fulfilled, (state, action) => {
        const campaign = state.pending.find((c) => c._id === action.payload.id);
        if (campaign) {
          campaign.status = "rejected";
          campaign.rejectionReason = action.payload.reason;
        }
      });
  },
});

export default adminCampaignSlice.reducer;