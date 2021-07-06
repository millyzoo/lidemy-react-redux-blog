import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import EditArticle from "../../components/EditArticle";
import { Wrapper, Container } from "../../layout/mainLayout";
import { getSingleArticle, updateArticle } from "../../WebAPI";
import { getAuthToken } from "../../utils";
import { useHistory, useParams } from "react-router-dom";
import {
  selectIsLoading,
  setIsLoading,
} from "../../redux/reducers/isLoadingReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../WebAPI";

export default function AddPostPage() {
  const [articleCategories, setArticleCategories] = useState([]);
  const [articleTitle, setArticleTitle] = useState("");
  const [currectCategory, setCurrectCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    if (!getAuthToken() && !user) {
      history.push("/login");
      return;
    } // 沒有登入就跳轉到登入頁面

    dispatch(setIsLoading(true));

    getSingleArticle(id).then((article) => {
      setArticleTitle(article.title);
      setCurrectCategory(article.category);
      setCoverImage(article.coverImage);
      setArticleContent(article.body);
      dispatch(setIsLoading(false));
    });

    getCategories().then((res) => {
      setArticleCategories(res);
    });
  }, [user, history, id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!articleTitle || !articleContent) {
      return setErrorMessage("文章標題或內容尚未填寫齊全");
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
          articleCategories={articleCategories}
          articleTitle={articleTitle}
          setArticleTitle={setArticleTitle}
          currectCategory={currectCategory}
          setCurrectCategory={setCurrectCategory}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          articleContent={articleContent}
          setArticleContent={setArticleContent}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </Container>
    </Wrapper>
  );
}
