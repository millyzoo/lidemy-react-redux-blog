import { createSlice } from "@reduxjs/toolkit";

export const themeReducer = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
    mountedComponent: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    setMountedComponent: (state, action) => {
      state.mountedComponent = action.payload;
    },
  },
});

export const selectTheme = (store) => store.theme.theme;
export const selectMountedComponent = (store) => store.theme.mountedComponent;

export const { setTheme, setMountedComponent } = themeReducer.actions;

export default themeReducer.reducer;
