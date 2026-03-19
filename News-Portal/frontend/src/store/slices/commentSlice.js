import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

const initialState = {
  comments: [],
  loading: false,
};

export const fetchComments = createAsyncThunk(
  "comments/get",
  async (articleId) => {
    const res = await API.get(`/comments/commentWithReplies/${articleId}`);
    return res.data.comments;
  }
);

export const addComment = createAsyncThunk(
  "comments/add",
  async (data) => {
    const res = await API.post("/comments/add", data);
    return res.data.comment;
  }
);

export const addReply = createAsyncThunk(
  "comments/reply",
  async (data) => {
    const res = await API.post("/comments/reply", data);
    return res.data.reply;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })

      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })

      .addCase(addReply.fulfilled, (state, action) => {

  const reply = action.payload;

  const parent = state.comments.find(
    (c) => c._id === reply.parentComment
  );

  if (parent) {
    parent.replies.push(reply);
  }

});
  },
});

export default commentSlice.reducer;