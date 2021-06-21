import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Wrapper, Container } from "../../layout/mainLayout";
import { getArticles } from "../../WebAPI";
import {
  getAllArticles,
  setArticles,
  selectIsLoading,
  selectArticles,
  selectTotalPage,
} from "../../redux/reducers/articleReducer";
import { useDispatch, useSelector } from "react-redux";
import Article from "../../components/Article/Article";
import Loading from "../../components/Loading";
import {
  BsChevronLeft as PreviousIcon,
  BsChevronRight as NextIcon,
} from "react-icons/bs";

const Articles = styled.ul`
  margin: 0 0 30px 0;
  padding: 0;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text.primary};

  svg {
    font-size: 18px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Page = styled.p`
  margin: 0 20px;
  font-size: 18px;
  line-height: 1.3;
`;

export default function ArticlePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const articles = useSelector(selectArticles);
  const totalPage = useSelector(selectTotalPage);
  const articlesLimit = 5; // 一頁幾篇文章

  useEffect(() => {
    dispatch(getAllArticles(currentPage, articlesLimit));
  }, [currentPage, dispatch]);

  const handlePreviousPage = () => {
    if (currentPage === 1) return;

    getArticles(currentPage - 1, articlesLimit)
      .then((res) => res.json())
      .then((articles) => {
        setCurrentPage(currentPage - 1);
        dispatch(setArticles(articles));
      });
  };

  const handleNextPage = () => {
    if (currentPage === totalPage) return;

    getArticles(currentPage + 1, articlesLimit)
      .then((res) => res.json())
      .then((articles) => {
        setCurrentPage(currentPage + 1);
        dispatch(setArticles(articles));
      });
  };

  return (
    <Wrapper>
      <Container>
        <Articles>
          {isLoading && <Loading />}
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </Articles>
        <Pagination>
          {currentPage !== 1 && <PreviousIcon onClick={handlePreviousPage} />}
          <Page>{currentPage}</Page>
          {currentPage !== totalPage && <NextIcon onClick={handleNextPage} />}
        </Pagination>
      </Container>
    </Wrapper>
  );
}
