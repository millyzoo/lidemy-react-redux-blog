import React, { useState, useEffect } from "react";
import EditArticle from "../../components/EditArticle";
import { Wrapper, Container } from "../../layout/mainLayout";
import { getAuthToken } from "../../utils";
import { useHistory } from "react-router-dom";
import {
  addArticle,
  setAddArticleResponse,
  setErrorMessage,
  selectAddArticleResponse,
  selectErrorMessage,
} from "../../redux/reducers/articleReducer";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userReducer";
import { getCategories } from "../../WebAPI";

export default function AddPostPage() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleCategories, setArticleCategories] = useState([]);
  const [currectCategory, setCurrectCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const addArticleResponse = useSelector(selectAddArticleResponse);
  const errorMessage = useSelector(selectErrorMessage);
  const user = useSelector(selectUser);

  if (!getAuthToken()) {
    if (!user) {
      // 沒有登入就跳轉到登入頁面
      history.push("/login");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!articleTitle || !articleContent) {
      return dispatch(setErrorMessage("文章標題或內容尚未填寫齊全"));
    }
    dispatch(
      addArticle(articleTitle, currectCategory, coverImage, articleContent)
    );
  };

  useEffect(() => {
    return () => {
      dispatch(setAddArticleResponse(null));
    };
  });

  useEffect(() => {
    if (addArticleResponse) {
      history.push(`/articles/`);
    }

    getCategories().then((res) => {
      setArticleCategories(res);
      setCurrectCategory(res[0].name);
    });
  }, [addArticleResponse, history, dispatch]);

  return (
    <Wrapper>
      <Container>
        <EditArticle
          pageTitle={"新增文章"}
          articleTitle={articleTitle}
          setArticleTitle={setArticleTitle}
          articleContent={articleContent}
          setArticleContent={setArticleContent}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          currectCategory={currectCategory}
          setCurrectCategory={setCurrectCategory}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          articleCategories={articleCategories}
        />
      </Container>
    </Wrapper>
  );
}
