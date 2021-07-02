import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const AddArticleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.text.primary};

  ${MEDIA_QUERY_SM} {
    margin-bottom: 15px;
    font-size: 20px;
  }
`;

const CategoryTitleContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
`;

const Category = styled.select`
  margin-right: 15px;
  padding: 10px;
  width: 150px;
  border: 1px solid transparent;
  border-radius: 3px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};

  ${MEDIA_QUERY_SM} {
    width: 100px;
  }
`;

const CategoryOption = styled.option`
  width: 100%;
`;

const TitleInput = styled.input`
  padding: 10px;
  width: calc(100% - 165px);
  border: 1px solid transparent;
  border-radius: 3px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  transition: 0.3s;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  ${MEDIA_QUERY_SM} {
    width: calc(100% - 115px);
  }
`;

const CoverImageInput = styled(TitleInput)`
  margin-bottom: 20px;
  width: 100%;
`;

const ContentTextarea = styled.textarea`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  height: 500px;
  border: 1px solid transparent;
  border-radius: 3px;
  color: ${({ theme }) => theme.text.primary};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.boxShadow.primary};
  transition: 0.3s;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  ${MEDIA_QUERY_SM} {
    height: 400px;
  }
`;

const SubmitAndRemind = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px 40px;
  background-color: ${({ theme }) => theme.button.submit};
  color: ${({ theme }) => theme.text.negative};
  border: transparent;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const ErrorText = styled.div`
  position: absolute;
  left: 0;
  width: fit-content;
  color: ${({ theme }) => theme.error};

  ${MEDIA_QUERY_SM} {
    bottom: -35px;
  }
`;

export default function EditArticle({
  pageTitle,
  articleTitle,
  setArticleTitle,
  articleContent,
  setArticleContent,
  handleSubmit,
  errorMessage,
  setErrorMessage,
  currectCategory,
  setCurrectCategory,
  coverImage,
  setCoverImage,
  articleCategories,
}) {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setErrorMessage(null));

    switch (e.target.name) {
      case "title":
        setArticleTitle(e.target.value);
        break;
      case "content":
        setArticleContent(e.target.value);
        break;
      case "cover":
        setCoverImage(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleCategoryChange = (e) => {
    setCurrectCategory(e.target.value);
  };

  return (
    <AddArticleForm onSubmit={handleSubmit}>
      <Title>{pageTitle}</Title>
      <CategoryTitleContainer>
        <Category value={currectCategory} onChange={handleCategoryChange}>
          {articleCategories.map((categories) => (
            <CategoryOption key={categories.id} value={categories.name}>
              {categories.name}
            </CategoryOption>
          ))}
        </Category>
        <TitleInput
          type="text"
          name="title"
          placeholder="文章標題"
          value={articleTitle}
          onChange={handleInputChange}
        />
      </CategoryTitleContainer>
      <CoverImageInput
        type="text"
        name="cover"
        placeholder="封面圖片網址，http://...."
        value={coverImage}
        onChange={handleInputChange}
      />
      <ContentTextarea
        type="text"
        name="content"
        placeholder="請輸入文章內容"
        value={articleContent}
        onChange={handleInputChange}
      />
      <SubmitAndRemind>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <SubmitButton>送出文章</SubmitButton>
      </SubmitAndRemind>
    </AddArticleForm>
  );
}

EditArticle.propTypes = {
  pageTitle: PropTypes.string,
  articleTitle: PropTypes.string,
  setArticleTitle: PropTypes.func,
  articleContent: PropTypes.string,
  setArticleContent: PropTypes.func,
  handleSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func,
  currectCategory: PropTypes.string,
  setCurrectCategory: PropTypes.func,
  coverImage: PropTypes.string,
  setCoverImage: PropTypes.func,
  articleCategories: PropTypes.array,
};
