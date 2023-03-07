import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import documentsReducer from "../features/documents/documentsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    documents: documentsReducer,
  },
});
