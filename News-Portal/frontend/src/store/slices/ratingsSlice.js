// frontend/src/store/slices/ratingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// Thunk: Submit or update rating
export const rateArticle = createAsyncThunk(
  "ratings/rateArticle",
  async ({ articleId, value }) => {
    const res = await API.post(`/ratings/article/${articleId}`, { value });
    return res.data; // { averageRating, totalRatings }
  }
);

const initialState = {
  averageRating: 0,
  totalRatings: 0,
  loading: false,
  error: null,
};

const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(rateArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(rateArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.averageRating = action.payload.averageRating;
        state.totalRatings = action.payload.totalRatings;
        state.error = null;
      })
      .addCase(rateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ratingSlice.reducer;