import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";


export const fetchAllArticles = createAsyncThunk(
  "admin/manage-articles",
  async (_, thunkAPI) => {  
    try {
      const res = await API.get("/admin/articles");
      return res.data.articles;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);


// GET Pending Articles
export const fetchPendingArticles = createAsyncThunk(
  "admin/fetchPending",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/pendingArticles");
      return res.data.articles;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// APPROVE
export const approveArticle = createAsyncThunk(
  "admin/approve",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/admin/approveArticle/${id}`);
      return res.data.article;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// REJECT
export const rejectArticle = createAsyncThunk(
  "admin/reject",
  async ({ id, reason }, thunkAPI) => {
    try {
      const res = await API.put(`/admin/rejectArticle/${id}`, { reason });
      return res.data.article;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// PUBLISH
export const publishArticle = createAsyncThunk(
  "admin/publish",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/admin/publishArticle/${id}`);
      return res.data.article;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const articleSlice = createSlice({
  name: "adminArticles",
  initialState: {
    articles: [],
    pending: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

    // FETCH ALL
      .addCase(fetchAllArticles.pending, (state) => {
        state.loading = true;
        })
        .addCase(fetchAllArticles.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = action.payload;
        })
        .addCase(fetchAllArticles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
      // FETCH
      .addCase(fetchPendingArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.pending = action.payload;
      })
      .addCase(fetchPendingArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // APPROVE
      .addCase(approveArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      })

      // REJECT
      .addCase(rejectArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      })

      // PUBLISH
      .addCase(publishArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((a) =>
          a._id === action.payload._id ? action.payload : a
        );
      });
  },
});

export default articleSlice.reducer;