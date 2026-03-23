import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../services/axios"

// 🔥 Only toggle
export const toggleBookmark = createAsyncThunk(
  "bookmark/toggle",
  async (articleId, thunkAPI) => {
    try {
      const res = await API.post("/reader/bookmark/toggle", { articleId })
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(toggleBookmark.pending, (state) => {
        state.loading = true
      })
      .addCase(toggleBookmark.fulfilled, (state) => {
        state.loading = false
        state.message = "Bookmark status updated"
      })
      .addCase(toggleBookmark.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default bookmarkSlice.reducer
