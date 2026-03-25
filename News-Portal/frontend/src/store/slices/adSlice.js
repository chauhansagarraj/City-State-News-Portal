import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// ✅ GET ACTIVE ADS
export const getActiveAds = createAsyncThunk(
  "ads/getActiveAds",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/advertiser/active-ads");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const adSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActiveAds.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActiveAds.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = action.payload;
      })
      .addCase(getActiveAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adSlice.reducer;