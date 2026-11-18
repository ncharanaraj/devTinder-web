import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedRducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedRducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});

export default appStore;
