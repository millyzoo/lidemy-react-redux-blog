import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Wrapper, Container, EmptyDataTitle } from "../../layout/mainLayout";
import Loading from "../../components/Loading";
import { getSingleArticle, deleteArticle } from "../../WebAPI";
import {
  selectIsLoading,
  setIsLoading,
} from "../../redux/reducers/isLoadingReducer";
import { selectUser } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
  AiOutlineCalendar as CalendarIcon,
  AiOutlineUser as PersonIcon,
  AiOutlineFolder as FolderIcon,
} from "react-icons/ai";

const ArticleModify = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
  padding: 0 25px;
  color: #505050;

  svg {
    margin-right: 3px;
    font-size: 16px;
  }
`;

const ArticleEdit = styled(Link)`
  display: flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 3px;
  text-decoration: none;
  font-size: 15px;
  color: ${({ theme }) => theme.button.modify};
  border: 1px solid ${({ theme }) => theme.button.modify};
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.button.modify};
    color: ${({ theme }) => theme.background.body};
  }
`;

const ArticleDelete = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 3px;
  margin-left: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.button.modify};
  border: 1px solid ${({ theme }) => theme.button.modify};
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.button.modify};
    color: ${({ theme }) => theme.background.body};
  }
`;

const ArticleContainer = styled.div`
  padding: 25px;
  width: 100%;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.second};
  background-color: ${({ theme }) => theme.background.opacity};
`;

const ArticleTitle = styled.div`
  margin-bottom: 5px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};

  ${MEDIA_QUERY_SM} {
    font-size: 18px;
  }
`;

const ArticleInfo = styled.div`
  display: flex;
  margin-bottom: 15px;

  svg {
    margin-right: 3px;
    color: ${({ theme }) => theme.text.second};
  }
`;

const ArticleCoverImage = styled.img`
  margin-bottom: 15px;
  max-width: 100%;
`;

const ArticleBody = styled.p`
  color: ${({ theme }) => theme.text.primary};
  white-space: pre-wrap;
  line-height: 1.5;
  word-break: break-word;
`;

const ArticleDate = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text.second};
`;

const ArticleInfoDetail = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const ArticleInfoLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text.second};
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export default function SingleArticlePage() {
  const [article, setArticle] = useState([]);
  const [articleAuthor, setArticleAuthor] = useState([]);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const getArticle = async (dispatch) => {
      dispatch(setIsLoading(true));

      try {
        const article = await getSingleArticle(id);
        const isEmptyArticle = Object.keys(article).length === 0;

        if (isEmptyArticle) {
          setArticle([]);
          setArticleAuthor(null);
        } else {
          setArticle(article);
          setArticleAuthor(article.user.username);
        }
        dispatch(setIsLoading(false));
        return article;
      } catch (error) {
        console.log("錯誤：" + error);
        dispatch(setIsLoading(false));
      }
    };

    getArticle(dispatch);
  }, [id, dispatch]);

  const handleArticleDelete = () => {
    deleteArticle(id).then(() => {
      history.push("/articles");
    });
  };

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading />}
        {user && articleAuthor === user.username && (
          <ArticleModify>
            <ArticleEdit to={`/edit/${article.id}`}>
              <EditIcon />
              編輯
            </ArticleEdit>
            <ArticleDelete onClick={handleArticleDelete}>
              <DeleteIcon />
              刪除
            </ArticleDelete>
          </ArticleModify>
        )}
        {!article ? (
          <EmptyDataTitle>找不到此篇文章。</EmptyDataTitle>
        ) : (
          <ArticleContainer>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleInfo>
              <ArticleDate>
                <CalendarIcon />
                {new Date(article.createdAt).toLocaleDateString()}
              </ArticleDate>
              {article.user && (
                <ArticleInfoDetail>
                  <PersonIcon />
                  <ArticleInfoLink to={`/author/${article.user.id}`}>
                    {article.user.nickname}
                  </ArticleInfoLink>
                </ArticleInfoDetail>
              )}
              <ArticleInfoDetail>
                <FolderIcon />
                <ArticleInfoLink to={`/category/${article.category}`}>
                  {article.category}
                </ArticleInfoLink>
              </ArticleInfoDetail>
            </ArticleInfo>
            {article.coverImage && (
              <ArticleCoverImage src={article.coverImage} alt="Article Cover" />
            )}
            <ArticleBody>{article.body}</ArticleBody>
          </ArticleContainer>
        )}
      </Container>
    </Wrapper>
  );
}
