import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const documentsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addDocument: (state, action) => {
      state.pop();
      state.push(action.payload);
    },
  },
});

export const { addDocument } = documentsSlice.actions;

export default documentsSlice.reducer;
