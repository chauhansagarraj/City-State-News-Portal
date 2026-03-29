import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// ================= CREATE CAMPAIGN =================
export const createCampaign = createAsyncThunk(
  "advertiser/campaign/create",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/advertiser", data);
      return res.data.campaign;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

export const updateCampaign = createAsyncThunk(
  "advertiser/updateCampaign",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.put(`/advertiser/update/${id}`, data);
      return res.data.campaign;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ================= GET MY CAMPAIGNS =================
export const getMyCampaigns = createAsyncThunk(
  "advertiser/campaign/my",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/advertiser/campaign/my");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ================= DELETE =================
export const deleteCampaign = createAsyncThunk(
  "advertiser/deleteCampaign",
  async (id, thunkAPI) => {
    try {
      const res = await API.delete(`/advertiser/delete/${id}`);
      return res.data; // ✅ FIX
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ================= SUBMIT =================
export const submitCampaign = createAsyncThunk(
  "advertiser/submitCampaign",
  async (id, thunkAPI) => {
    try {
      await API.post(`/advertiser/submit/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ================= PAUSE =================
export const pauseCampaign = createAsyncThunk(
  "advertiser/pauseCampaign",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/advertiser/pause/${id}`);
      return res.data; // ✅ FIX
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ================= RESUME =================
export const resumeCampaign = createAsyncThunk(
  "advertiser/resumeCampaign",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/advertiser/resume/${id}`);
      return res.data; // ✅ FIX
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

export const getWallet = createAsyncThunk(
  "advertiser/getWallet",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/advertiser/wallet");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ================= ADD FUNDS =================
export const addFunds = createAsyncThunk(
  "advertiser/addFunds",
  async (amount, thunkAPI) => {
    try {
      const res = await API.post("/advertiser/add-funds", { amount });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ================= SLICE =================
const advertiserSlice = createSlice({
  name: "advertiser",
  initialState: {
    campaigns: [],
    loading: false,
    error: null,
    message: null,
    walletBalance: 0,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // GET CAMPAIGNS
      .addCase(getMyCampaigns.pending, (state) => {
        state.loading = true;
      })
     .addCase(getMyCampaigns.fulfilled, (state, action) => {
  state.loading = false;

  state.campaigns = action.payload || []; // ✅ FIX
})
      .addCase(getMyCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.campaigns.unshift(action.payload);
        state.message = "Campaign created successfully";
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE
      // ===== UPDATE =====
      .addCase(updateCampaign.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.campaigns.findIndex((c) => c._id === updated._id);

        if (index !== -1) {
          state.campaigns[index] = updated;
        }

        state.message = "Campaign updated successfully";
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
.addCase(deleteCampaign.fulfilled, (state, action) => {
  state.campaigns = state.campaigns.filter(
    (c) => c._id !== action.payload.id
  );
  state.message = action.payload.message;
})
.addCase(deleteCampaign.rejected, (state, action) => {

  state.error = action.payload;
})
      // SUBMIT
      .addCase(submitCampaign.fulfilled, (state, action) => {
        const campaign = state.campaigns.find((c) => c._id === action.payload);
        if (campaign) campaign.status = "pending";
        state.message = "Campaign submitted for review";
      })

      // PAUSE
      .addCase(pauseCampaign.fulfilled, (state, action) => {
        const updated = action.payload.campaign;

        const index = state.campaigns.findIndex((c) => c._id === updated._id);

        if (index !== -1) {
          state.campaigns[index] = updated;
        }

        state.message = action.payload.message;
      })
      .addCase(pauseCampaign.rejected, (state, action) => {
  state.error = action.payload;
})

      // RESUME
      .addCase(resumeCampaign.fulfilled, (state, action) => {
        const updated = action.payload.campaign;

        const index = state.campaigns.findIndex((c) => c._id === updated._id);

        if (index !== -1) {
          state.campaigns[index] = updated;
        }

        state.message = action.payload.message;
      })
      .addCase(resumeCampaign.rejected, (state, action) => {
  state.error = action.payload;
})

      // ADD FUNDS
      .addCase(addFunds.fulfilled, (state, action) => {
        state.walletBalance = action.payload.balance;
        state.message = "Funds added successfully";
      })

      .addCase(getWallet.fulfilled, (state, action) => {
  state.walletBalance = action.payload.balance;
});

      
  },
});
export const { clearMessages } = advertiserSlice.actions;
export default advertiserSlice.reducer;
