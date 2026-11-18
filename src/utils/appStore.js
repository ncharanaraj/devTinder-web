import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedRducer from "./feedSlice";
import connectionReducer from "./connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedRducer,
    connection: connectionReducer,
  },
});

export default appStore;
