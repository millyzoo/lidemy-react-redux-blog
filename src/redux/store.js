import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./reducers/articleReducer";
import userReducer from "./reducers/userReducer";
import themeReducer from "./reducers/themeReducer";
import searchReducer from "./reducers/searchReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    articles: articleReducer,
    theme: themeReducer,
    search: searchReducer,
  },
});
