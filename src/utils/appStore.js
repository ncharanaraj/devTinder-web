import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedRducer from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedRducer,
  },
});

export default appStore;
