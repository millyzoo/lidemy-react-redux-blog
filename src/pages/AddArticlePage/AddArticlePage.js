import React, { useState, useEffect } from "react";
import EditArticle from "../../components/EditArticle";
import { Wrapper, Container } from "../../layout/mainLayout";
import { getAuthToken } from "../../utils";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userReducer";
import { getCategories, addArticle } from "../../WebAPI";

export default function AddPostPage() {
  const [articleCategories, setArticleCategories] = useState([]);
  const [articleTitle, setArticleTitle] = useState("");
  const [currectCategory, setCurrectCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();
  const user = useSelector(selectUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!articleTitle || !articleContent) {
      return setErrorMessage("文章標題或內容尚未填寫齊全");
    }

    addArticle(articleTitle, currectCategory, coverImage, articleContent).then(
      (data) => {
        if (!data.ok) {
          history.push("/articles");
        } else {
          // 錯誤處理
          return setErrorMessage(data.message);
        }
      }
    );
  };

  useEffect(() => {
    if (!getAuthToken() && !user) {
      history.push("/login");
      return;
    } // 沒有登入就跳轉到登入頁面

    getCategories().then((res) => {
      setArticleCategories(res);
      setCurrectCategory(res[0].name);
    });
  }, [user, history]);

  return (
    <Wrapper>
      <Container>
        <EditArticle
          pageTitle={"新增文章"}
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
