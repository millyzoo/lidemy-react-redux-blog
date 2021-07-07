import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Link } from "react-router-dom";
import {
  AiOutlineCalendar as CalendarIcon,
  AiOutlineUser as PersonIcon,
} from "react-icons/ai";
import PropTypes from "prop-types";

const ArticleItem = styled.li`
  display: flex;
  padding: 25px;
  width: 100%;
  list-style: none;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.second};
  transition: 0.3s;
  background-color: ${({ theme }) => theme.background.opacity};

  & + & {
    margin-top: 30px;
  }

  ${MEDIA_QUERY_SM} {
    position: relative;
    flex-direction: column-reverse;
    padding: 30px 20px 20px 20px;
  }
`;

const ArticleInfo = styled.div`
  width: ${(props) => (props.hideCoverImage ? "100%" : "calc(100% - 185px)")};

  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`;

const ArticleHead = styled.div`
  display: flex;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ArticleCategory = styled.p`
  margin-right: 10px;
  padding: 2px 10px;
  background-color: ${({ theme }) => theme.background.category};
  border-radius: 3px;
  font-size: 15px;
  word-break: keep-all;

  ${MEDIA_QUERY_SM} {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
  }
`;

const ArticleTitle = styled(Link)`
  width: fit-content;
  text-decoration: none;
  color: ${({ theme }) => theme.text.primary};
  font-size: 22px;
  font-weight: 500;

  ${MEDIA_QUERY_SM} {
    font-size: 18px;
  }

  @media (min-width: 576px) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const ArticleContent = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.text.second};

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ArticleFooter = styled.div`
  display: flex;
  margin-top: 20px;
  color: ${({ theme }) => theme.text.second};

  ${MEDIA_QUERY_SM} {
    justify-content: flex-end;
  }
`;

const ArticleDate = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const ArticleFooterLink = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;

  svg {
    margin-right: 3px;
    color: ${({ theme }) => theme.text.second};
  }
`;

const Author = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text.second};
  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ArticleCoverImage = styled(Link)`
  margin-left: 20px;
  width: 165px;
  height: 110px;
  background-color: #fff;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  ${MEDIA_QUERY_SM} {
    margin-left: 0;
    margin-bottom: 15px;
    width: 100%;
    height: 60%;

    &:hover {
      img {
        transform: scale(1);
      }
    }
  }
`;

export default function ArticleFullVersion({ article, hideCoverImage }) {
  return (
    <ArticleItem>
      <ArticleInfo hideCoverImage={hideCoverImage}>
        <ArticleHead>
          <ArticleCategory>{article.category}</ArticleCategory>
          <ArticleTitle to={`/articles/${article.id}`}>
            {article.title}
          </ArticleTitle>
        </ArticleHead>
        <ArticleContent>
          <p>{article.body}</p>
        </ArticleContent>
        <ArticleFooter>
          <ArticleDate>
            <CalendarIcon />
            {new Date(article.createdAt).toLocaleDateString()}
          </ArticleDate>
          <ArticleFooterLink>
            <PersonIcon />
            {article.user && (
              <Author to={`/author/${article.user.id}`}>
                {article.user.nickname}
              </Author>
            )}
          </ArticleFooterLink>
        </ArticleFooter>
      </ArticleInfo>
      {article.coverImage && (
        <ArticleCoverImage to={`/articles/${article.id}`}>
          <img src={article.coverImage} alt="Article Cover" />
        </ArticleCoverImage>
      )}
    </ArticleItem>
  );
}

ArticleFullVersion.propTypes = {
  article: PropTypes.object,
  showAuthor: PropTypes.bool,
  hideCoverImage: PropTypes.bool,
};
