import { configureStore } from "@reduxjs/toolkit";
import Papersreducer from "./reducers/papersreducer";
export default configureStore({
  reducer: { paper: Papersreducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
