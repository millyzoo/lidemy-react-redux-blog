import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Wrapper, Container, EmptyDataTitle } from "../../layout/mainLayout";
import ArticleFullVersion from "../../components/Article/ArticleFullVersion";
import Loading from "../../components/Loading";
import { getArticles } from "../../WebAPI";
import { useParams } from "react-router-dom";
import {
  selectSearchData,
  setSearchData,
} from "../../redux/reducers/searchReducer";
import { useDispatch, useSelector } from "react-redux";

const Title = styled.p`
  margin-bottom: 30px;
  font-size: 22px;
  color: ${({ theme }) => theme.text.primary};
  line-height: 1.8;

  span {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.8;
    border-bottom: 1px dotted ${({ theme }) => theme.text.second};
  }

  ${MEDIA_QUERY_SM} {
    font-size: 20px;

    span {
      font-size: 20px;
    }
  }
`;

export default function SearchPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { keyword } = useParams();
  const dispatch = useDispatch();
  const searchData = useSelector(selectSearchData);

  useEffect(() => {
    setIsLoading(true);
    dispatch(setSearchData(keyword));
    getArticles()
      .then((res) => res.json())
      .then((data) => {
        const results = data.filter(
          ({ title, body }) =>
            title.toLowerCase().includes(keyword) ||
            body.toLowerCase().includes(keyword)
        );
        setArticles(results);
        setIsLoading(false);
      });
  }, [keyword, dispatch]);

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <Container>
        {articles.length === 0 ? (
          <EmptyDataTitle>目前無符合的資料。</EmptyDataTitle>
        ) : (
          <Title>
            以下是與「
            <span>{searchData}</span>
            」相符的文章
          </Title>
        )}

        {articles.map((article) => (
          <ArticleFullVersion
            key={article.id}
            article={article}
            hideCoverImage={!article.coverImage}
          />
        ))}
      </Container>
    </Wrapper>
  );
}
