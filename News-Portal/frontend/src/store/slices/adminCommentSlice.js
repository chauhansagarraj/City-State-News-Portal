import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

export const fetchAdminComments = createAsyncThunk(
  "admin/manage-comments",
  async ({ page = 1, status = "" }, thunkAPI) => {
    try {
      const res = await API.get(
        `/comments/admin?page=${page}&limit=10&status=${status}`
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const toggleComment = createAsyncThunk(
  "admin/toggle",
  async (id, thunkAPI) => {
    try {
      const res = await API.put(`/comments/hide/${id}`);
      return { id, status: res.data.status };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const adminCommentSlice = createSlice({
  name: "adminComments",
  initialState: {
    comments: [],
    page: 1,
    totalPages: 1,
    total: 0,
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(toggleComment.fulfilled, (state, action) => {
        const comment = state.comments.find(
          (c) => c._id === action.payload.id
        );
        if (comment) {
          comment.status = action.payload.status;
        }
      });
  },
});

export default adminCommentSlice.reducer;