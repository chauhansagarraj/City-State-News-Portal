import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

export const fetchAllUsers = createAsyncThunk(
  "admin/manage-users",
  async () => {
    const res = await API.get("/admin/users");
    return res.data;
  }
);

export const fetchPendingUsers = createAsyncThunk(
  "admin/pending-users",
  async () => {
    const res = await API.get("/admin/pending");
    return res.data;
  }
);

export const approveUser = createAsyncThunk(
  "admin/approve-user",
  async (id) => {
    await API.put(`/admin/approve/${id}`);
    return id;
  }
);

export const rejectUser = createAsyncThunk(
  "admin/reject-user",
  async ({ id, reason }) => {
    await API.put(`/admin/reject/${id}`, { reason });
    return id;
  }
);

export const blockUser = createAsyncThunk(
  "admin/block-user",
  async (id) => {
    await API.put(`/admin/block/${id}`);
    return id;
  }
);

export const unblockUser = createAsyncThunk(
  "admin/unblock-user",
  async (id) => {
    await API.put(`/admin/unblock/${id}`);
    return id;
  }
);

const slice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    pending: [],
    loading: false,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchPendingUsers.fulfilled, (state, action) => {
        state.pending = action.payload;
      });
  },
});

export default slice.reducer;