import { createSlice } from "@reduxjs/toolkit";

export const searchReducer = createSlice({
  name: "search",
  initialState: {
    data: null,
  },
  reducers: {
    setSearchData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectSearchData = (store) => store.search.data;

export const { setSearchData } = searchReducer.actions;

export default searchReducer.reducer;
