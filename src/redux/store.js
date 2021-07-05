import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./reducers/articleReducer";
import userReducer from "./reducers/userReducer";
import themeReducer from "./reducers/themeReducer";
import searchReducer from "./reducers/searchReducer";
import isLoadingReducer from "./reducers/isLoadingReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    articles: articleReducer,
    theme: themeReducer,
    search: searchReducer,
    isLoading: isLoadingReducer,
  },
});
