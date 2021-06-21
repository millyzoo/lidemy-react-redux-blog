import { createSlice } from "@reduxjs/toolkit";
import {
  getSingleArticle as getSingleArticleAPI,
  addArticle as addArticleAPI,
  getArticles as getArticlesAPI,
  deleteArticle as deleteArticleAPI,
} from "../../WebAPI";

export const articleReducer = createSlice({
  name: "articles",
  initialState: {
    isLoading: false,
    articles: [],
    article: null,
    articleAuthor: null,
    totalPage: null,
    addArticleResponse: null,
    errorMessage: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setArticles: (state, action) => {
      state.articles = action.payload;
    },

    setSingleArticle: (state, action) => {
      state.article = action.payload;
    },

    setArticleAuthor: (state, action) => {
      state.articleAuthor = action.payload;
    },

    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },

    setAddArticleResponse: (state, action) => {
      state.addArticleResponse = action.payload;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const selectIsLoading = (store) => store.articles.isLoading;
export const selectArticle = (store) => store.articles.article;
export const selectArticles = (store) => store.articles.articles;
export const selectArticleAuthor = (store) => store.articles.articleAuthor;
export const selectTotalPage = (store) => store.articles.totalPage;
export const selectAddArticleResponse = (store) =>
  store.articles.addArticleResponse;
export const selectErrorMessage = (store) => store.articles.errorMessage;

export const {
  setIsLoading,
  setArticles,
  setSingleArticle,
  setArticleAuthor,
  setTotalPage,
  setAddArticleResponse,
  setErrorMessage,
} = articleReducer.actions;

export const getArticles = (pageNumber, articlesLimit) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const response = await getArticlesAPI(pageNumber, articlesLimit);
    const data = await response.json();
    dispatch(setArticles(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log("錯誤：" + error);
    dispatch(setIsLoading(false));
  }
};

export const getAllArticles =
  (currentPage, articlesLimit) => async (dispatch) => {
    dispatch(setIsLoading(true));

    try {
      const response = await getArticlesAPI(currentPage, articlesLimit);
      const articles = await response.json();
      const articlesQuantity = response.headers.get("x-total-count"); // 從 api response headers 取得文章總數
      const currentTotalPage = Math.ceil(articlesQuantity / articlesLimit); // (文章總數 / 一頁顯示幾篇) 再用 Math.ceil() 無條件進位 = 總頁數

      dispatch(setTotalPage(currentTotalPage));
      dispatch(setArticles(articles));
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log("錯誤：" + error);
      dispatch(setIsLoading(false));
    }
  };

export const getSingleArticle = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));

  try {
    const article = await getSingleArticleAPI(id);
    const isEmptyArticle = Object.keys(article).length === 0;

    if (isEmptyArticle) {
      dispatch(setSingleArticle(null));
      dispatch(setArticleAuthor(null));
    } else {
      dispatch(setSingleArticle(article));
      dispatch(setArticleAuthor(article.user.username));
    }
    dispatch(setIsLoading(false));
    return article;
  } catch (error) {
    console.log("錯誤：" + error);
    dispatch(setIsLoading(false));
  }
};

export const addArticle = (title, content) => async (dispatch) => {
  try {
    const article = await addArticleAPI(title, content);
    dispatch(setAddArticleResponse(article));
    dispatch(setErrorMessage(null));
  } catch (error) {
    console.log("錯誤：" + error);
  }
};

export const deleteArticle = (articleId) => () => {
  deleteArticleAPI(articleId).then((response) => {
    return response;
  });
};

export default articleReducer.reducer;
