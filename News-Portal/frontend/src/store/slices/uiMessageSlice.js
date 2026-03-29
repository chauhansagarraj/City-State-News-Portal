
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    message: null,
    type: "success", // success | error
  },
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
    },
    clearToast: (state) => {
      state.message = null;
    },
  },
});

export const { showToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;