import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../services/axios"

export const getReaderDashboard = createAsyncThunk(
  "reader/dashboard",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/reader/dashboard")
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

const readerSlice = createSlice({
  name: "reader",
  initialState: {
    recommended: [],
    likedArticles: [],
     savedArticles: [],
    comments: [],
    activitySummary: {},
    loading: false,
  },

   reducers: {
    updateSavedArticles: (state, action) => {
      const articleId = action.payload;
  
      const exists = state.savedArticles.some(
        (a) => a._id === articleId
      );
  
      if (exists) {
        
        state.savedArticles = state.savedArticles.filter(
          (a) => a._id !== articleId
        );
      } else {
        
        state.savedArticles.push({ _id: articleId });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReaderDashboard.pending, (state) => {
        state.loading = true
      })
      .addCase(getReaderDashboard.fulfilled, (state, action) => {
        state.loading = false
        state.recommended = action.payload.recommended
        state.likedArticles = action.payload.likedArticles
         state.savedArticles = action.payload.savedArticles
        state.comments = action.payload.comments
        state.activitySummary = action.payload.activitySummary
      })
  },
})

export default readerSlice.reducer
export const { updateSavedArticles } = readerSlice.actions;