import { createSlice } from "@reduxjs/toolkit";

export const isLoadingReducer = createSlice({
  name: "isLoading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const selectIsLoading = (store) => store.isLoading.isLoading;
export const { setIsLoading } = isLoadingReducer.actions;

export default isLoadingReducer.reducer;
