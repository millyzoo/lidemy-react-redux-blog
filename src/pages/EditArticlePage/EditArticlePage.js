import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import EditArticle from "../../components/EditArticle";
import { Wrapper, Container } from "../../layout/mainLayout";
import { updateArticle } from "../../WebAPI";
import { getAuthToken } from "../../utils";
import { useHistory, useParams } from "react-router-dom";
import {
  setIsLoading,
  getSingleArticle,
  setErrorMessage,
  selectIsLoading,
  selectErrorMessage,
} from "../../redux/reducers/articleReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../WebAPI";

export default function AddPostPage() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleCategories, setArticleCategories] = useState([]);
  const [currectCategory, setCurrectCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");

  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectErrorMessage);
  const user = useSelector(selectUser);

  if (!getAuthToken()) {
    if (!user) {
      // 沒有登入就跳轉到登入頁面
      history.push("/login");
    }
  }

  useEffect(() => {
    dispatch(setIsLoading(true));

    dispatch(getSingleArticle(id)).then((article) => {
      setArticleTitle(article.title);
      setArticleContent(article.body);
      setCurrectCategory(article.category);
      setCoverImage(article.coverImage);
    });

    getCategories().then((res) => {
      setArticleCategories(res);
    });
  }, [id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!articleTitle || !articleContent) {
      return dispatch(setErrorMessage("文章標題或內容尚未填寫齊全"));
    }
    updateArticle(
      id,
      articleTitle,
      currectCategory,
      coverImage,
      articleContent
    ).then((data) => {
      if (!data.id) return;
      history.push(`/articles/${id}`);
    });
  };

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading />}
        <EditArticle
          pageTitle={"編輯文章"}
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
