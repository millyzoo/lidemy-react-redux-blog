import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Container,
  EmptyDataTitle,
  ResultPageTitleContainer,
  ResultPageTitle,
} from "../../layout/mainLayout";
import { AiOutlineUser as PersonIcon } from "react-icons/ai";
import { getAuthorArticles } from "../../WebAPI";
import Article from "../../components/Article/Article";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [authorNickname, setAuthorNickname] = useState();
  const [hasAuthor, setHasAuthor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let { userId } = useParams();

  async function getArticles(userId) {
    try {
      const data = await getAuthorArticles(userId);
      setArticles(data);
      setAuthorNickname(data[0].user.nickname);
      setHasAuthor(true);
      setIsLoading(false);
    } catch (error) {
      console.log("錯誤：" + error);
      setHasAuthor(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getArticles(userId);
  }, [userId]);

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading />}
        {hasAuthor ? (
          <ResultPageTitleContainer>
            <PersonIcon />
            <ResultPageTitle>{authorNickname}</ResultPageTitle>發表的所有文章
          </ResultPageTitleContainer>
        ) : (
          <EmptyDataTitle>找不到作者。</EmptyDataTitle>
        )}
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </Container>
    </Wrapper>
  );
}
