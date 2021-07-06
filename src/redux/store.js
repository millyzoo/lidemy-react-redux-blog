import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import themeReducer from "./reducers/themeReducer";
import searchReducer from "./reducers/searchReducer";
import isLoadingReducer from "./reducers/isLoadingReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    search: searchReducer,
    isLoading: isLoadingReducer,
  },
});
