import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import articleReducer from "./slices/articleSlice";
import commentReducer from "./slices/commentSlice";
import ratingReducer from "./slices/ratingsSlice";
import dashboardSlice from "./slices/dashboardSlice";
import readerSlice from "./slices/readerSlice";
import advertiserSlice from "./slices/advertiserSlice";
import adSlice from "./slices/adSlice";
import advertiserDashboardSlice from "./slices/advertiserDashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    comments : commentReducer,
    ratings: ratingReducer,
    dashboard: dashboardSlice,
    reader: readerSlice,
    advertiser: advertiserSlice,
    ads: adSlice,
    advertiserDashboard: advertiserDashboardSlice,
  },
});