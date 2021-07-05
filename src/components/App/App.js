import React, { useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import useDarkMode from "../../hooks/useDarkMode";
import GlobalStyle from "../../layout/globalStyle";
import themes from "../Themes";
import Header from "../Header";
import Footer from "../Footer";
import { getAuthToken } from "../../utils";
import { getUser } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import {
  LoginPage,
  RegisterPage,
  HomePage,
  ArticlesPage,
  SingleArticlePage,
  AuthorPage,
  CategoryPage,
  AddArticlePage,
  EditArticlePage,
  SearchPage,
} from "../../pages";

function App() {
  const [theme, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? themes.light : themes.dark;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!getAuthToken()) return; // 有 token 才執行後面 API 的動作

    dispatch(getUser());
  }, [dispatch]);

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            {/* 沒有寫 exact 就會每個頁面都被匹配到 */}
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/articles">
            <ArticlesPage />
          </Route>
          <Route path="/articles/:id">
            <SingleArticlePage />
          </Route>
          <Route path="/author/:userId">
            <AuthorPage />
          </Route>
          <Route path="/category/:categoryName">
            <CategoryPage />
          </Route>
          <Route path="/add-article">
            <AddArticlePage />
          </Route>
          <Route path="/edit/:id">
            <EditArticlePage />
          </Route>
          <Route path="/search/:keyword">
            <SearchPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
