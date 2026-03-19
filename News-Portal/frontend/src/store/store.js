import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import articleReducer from "./slices/articleSlice";
import commentReducer from "./slices/commentSlice";
import ratingReducer from "./slices/ratingsSlice";
import dashboardSlice from "./slices/dashboardSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    comments : commentReducer,
    ratings: ratingReducer,
    dashboard: dashboardSlice,
  },
});