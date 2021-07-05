import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Container,
  EmptyDataTitle,
  ResultPageTitleContainer,
  ResultPageTitle,
} from "../../layout/mainLayout";
import { AiOutlineFolder as FolderIcon } from "react-icons/ai";
import { getFilterCategories, getAllCategoryArticles } from "../../WebAPI";
import {
  selectIsLoading,
  setIsLoading,
} from "../../redux/reducers/isLoadingReducer";
import { useDispatch, useSelector } from "react-redux";
import Article from "../../components/Article/Article";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const [articles, setArticles] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [hasCategory, setHasCategory] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  let { categoryName } = useParams();
  
  useEffect(() => {
    dispatch(setIsLoading(true));    
    setCurrentCategory(categoryName)
    
    getFilterCategories(categoryName).then((data) => {
      if (data.length === 0) {
        setHasCategory(false)
        return
      }
      setHasCategory(true)
      setCurrentCategory(categoryName)
      dispatch(setIsLoading(false));
    });
  }, [categoryName, dispatch]);

  useEffect(() => {
    dispatch(setIsLoading(true));
    setArticles([])

    async function getArticles(categoryName) {
      try {
        const data = await getAllCategoryArticles(categoryName);
        if (data.length === 0) {
          setArticles("");
          dispatch(setIsLoading(false));
          return
        }
        setArticles(data);
        dispatch(setIsLoading(false));
      } catch (error) {
        console.log("錯誤：" + error);
        dispatch(setIsLoading(false));
      }
    }

    getArticles(categoryName);
  }, [dispatch, categoryName]);

  return (
    <Wrapper>
      <Container>
        {isLoading && <Loading />}
        {hasCategory && currentCategory ? (
          <ResultPageTitleContainer>
            <FolderIcon />
            <ResultPageTitle>{currentCategory}</ResultPageTitle>
          </ResultPageTitleContainer>
        ) : (
          <EmptyDataTitle>找不到分類。</EmptyDataTitle>
        )}
        {articles && articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </Container>
    </Wrapper>
  );
}
