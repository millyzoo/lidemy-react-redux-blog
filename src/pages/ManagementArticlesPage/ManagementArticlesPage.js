import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import React, { useState, useEffect } from "react";
import { Wrapper, Container } from "../../layout/mainLayout";
import { getAuthorArticles } from "../../WebAPI";
import {
  selectIsLoading,
  setIsLoading,
} from "../../redux/reducers/isLoadingReducer";
import { deleteArticle } from "../../redux/reducers/articleReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { useHistory, Link } from "react-router-dom";

const ManagementHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.p`
  margin: 0 auto;
  font-size: 22px;
  color: ${({ theme }) => theme.text.primary};

  ${MEDIA_QUERY_SM} {
    margin: 0;
  }
`;

const AddArticlesButton = styled(Link)`
  padding: 8px 15px;
  background-color: #0051c3;
  text-decoration: none;
  color: #ffffff;
  border-radius: 5px;

  ${MEDIA_QUERY_SM} {
    margin-left: auto;
  }
`;

const ArticlesContainer = styled.div`
  padding: 25px 40px;
  width: 100%;
  list-style: none;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.second};
  transition: 0.3s;
  background-color: ${({ theme }) => theme.background.opacity};

  ${MEDIA_QUERY_SM} {
    padding: 5px 20px;
  }
`;
const Article = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-top: 1px solid ${({ theme }) => theme.border};

  &:first-child {
    border-top: none;
  }

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const ArticleInfo = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 100px);
  color: ${({ theme }) => theme.text.primary};

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const ArticleTitle = styled(Link)`
  margin-left: 25px;
  text-decoration: none;
  color: ${({ theme }) => theme.text.primary};

  ${MEDIA_QUERY_SM} {
    margin-left: 0;
    margin-top: 5px;
  }
`;

const ManageAction = styled.div`
  position: relative;
  display: flex;

  &::after {
    position: absolute;
    content: "";
    top: 6px;
    right: 50%;
    width: 1px;
    height: 16px;
    background: ${({ theme }) => theme.text.third};
  }

  ${MEDIA_QUERY_SM} {
    margin: 10px 0 0 auto;
    width: fit-content;
  }
`;

const EditArticleButton = styled(Link)`
  margin-right: 20px;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;

const DeleteArticleButton = styled.p`
  color: ${({ theme }) => theme.text.third};
  cursor: pointer;
`;

export default function ArticlePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [articles, setArticles] = useState([]);
  const isLoading = useSelector(selectIsLoading);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    dispatch(setIsLoading(true));
    if (currentUser) {
      getAuthorArticles(currentUser.id).then((response) => {
        setArticles(response);
        dispatch(setIsLoading(false));
      });
    }
  }, [currentUser, dispatch]);

  const handleArticleDelete = (e) => {
    dispatch(deleteArticle(e.target.dataset.articleId));

    setTimeout(() => {
      history.go(0);
    }, 500);
    // 如果沒有加 setTimeout，跳轉頁面時，還是會抓到舊資料
  };

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading />}
        <ManagementHeader>
          <Title>文章管理</Title>
          <AddArticlesButton to="/add-article">新增文章</AddArticlesButton>
        </ManagementHeader>
        <ArticlesContainer>
          {articles.map((article) => (
            <Article key={article.id}>
              <ArticleInfo>
                {new Date(article.createdAt).toLocaleDateString()}
                <ArticleTitle to={`/articles/${article.id}`}>
                  {article.title}
                </ArticleTitle>
              </ArticleInfo>
              <ManageAction>
                <EditArticleButton to={`/edit/${article.id}`}>
                  編輯
                </EditArticleButton>
                <DeleteArticleButton
                  data-article-id={article.id}
                  onClick={handleArticleDelete}
                >
                  刪除
                </DeleteArticleButton>
              </ManageAction>
            </Article>
          ))}
        </ArticlesContainer>
      </Container>
    </Wrapper>
  );
}
