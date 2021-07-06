import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/breakpoint";
import { Wrapper, Container, EmptyDataTitle } from "../../layout/mainLayout";
import {
  getArticles,
  getCategories,
  getCategoryArticles as getCategoryArticlesData,
} from "../../WebAPI";
import {
  selectIsLoading,
  setIsLoading,
} from "../../redux/reducers/isLoadingReducer";
import { useDispatch, useSelector } from "react-redux";
import ArticleFullVersion from "../../components/Article/ArticleFullVersion";
import Loading from "../../components/Loading";
import { AiOutlineFolder as FolderIcon } from "react-icons/ai";
import {
  BsChevronLeft as PreviousIcon,
  BsChevronRight as NextIcon,
  BsChevronDown as DownArrowIcon,
} from "react-icons/bs";

const Articles = styled.ul`
  margin: 0 0 30px 0;
  padding: 0;
`;

const TitleCategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  font-size: 22px;
  color: ${({ theme }) => theme.text.primary};

  svg {
    margin-right: 5px;
    font-size: 22px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 20px;

    svg {
      font-size: 20px;
    }
  }
`;

const CategoryContainer = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const CategoryDefault = styled.div`
  padding: 7px 45px 7px 15px;
  background-color: ${({ theme }) => theme.background.category};
  border-radius: ${(props) => (props.isOpen ? "3px 3px 0 0" : "3px")};
  cursor: pointer;
`;

const CategoriesOption = styled.ul`
  position: absolute;
  padding: 0;
  width: 100%;
  list-style: none;
  z-index: 1;
`;

const Category = styled.li`
  display: block;
  padding: 5px 15px;
  text-decoration: none;
  color: #111;
  background-color: ${({ theme }) => theme.background.category};
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #fff;
  }
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
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoriesOptionOpen, setIsCategoriesOptionOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [totalPage, setTotalPage] = useState();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const articlesLimit = 5; // 一頁幾篇文章

  const getAllArticles = useCallback(
    (currentPage, articlesLimit) => {
      dispatch(setIsLoading(true));

      const getAllArticlesData = async (currentPage, articlesLimit) => {
        try {
          const response = await getArticles(currentPage, articlesLimit);
          const articlesQuantity = response.headers.get("x-total-count"); // 從 api response headers 取得文章總數
          const articles = await response.json();

          setTotalPage(Math.ceil(articlesQuantity / articlesLimit)); // (文章總數 / 一頁顯示幾篇) 再用 Math.ceil() 無條件進位 = 總頁數
          setArticles(articles);
          dispatch(setIsLoading(false));
        } catch (error) {
          console.log("錯誤：" + error);
          dispatch(setIsLoading(false));
        }
      };

      getAllArticlesData(currentPage, articlesLimit);
    },
    [dispatch]
  );

  const getAllCategoryArticles = useCallback(
    (currentPage, articlesLimit, category) => {
      dispatch(setIsLoading(true));

      const getCategoryArticles = async (
        currentPage,
        articlesLimit,
        category
      ) => {
        try {
          const response = await getCategoryArticlesData(
            currentPage,
            articlesLimit,
            category
          );
          const articlesQuantity = response.headers.get("x-total-count"); // 從 api response headers 取得文章總數
          const articlesData = await response.json();

          setTotalPage(Math.ceil(articlesQuantity / articlesLimit)); // (文章總數 / 一頁顯示幾篇) 再用 Math.ceil() 無條件進位 = 總頁數
          setArticles(articlesData);
          dispatch(setIsLoading(false));
        } catch (error) {
          console.log("錯誤：" + error);
          dispatch(setIsLoading(false));
        }
      };

      getCategoryArticles(currentPage, articlesLimit, category);
    },
    [dispatch]
  );

  const handlePreviousPage = () => {
    if (currentPage === 1) return;

    if (currentCategory === "all") {
      getArticles(currentPage - 1, articlesLimit)
        .then((res) => res.json())
        .then((articles) => {
          setCurrentPage(currentPage - 1);
          setArticles(articles);
        });
    } else {
      getCategoryArticlesData(currentPage - 1, articlesLimit, currentCategory)
        .then((res) => res.json())
        .then((articles) => {
          setCurrentPage(currentPage - 1);
          setArticles(articles);
        });
    }
  };

  const handleNextPage = () => {
    if (currentPage === totalPage) return;

    if (currentCategory === "all") {
      getArticles(currentPage + 1, articlesLimit)
        .then((res) => res.json())
        .then((articles) => {
          setCurrentPage(currentPage + 1);
          setArticles(articles);
        });
    } else {
      getCategoryArticlesData(currentPage + 1, articlesLimit, currentCategory)
        .then((res) => res.json())
        .then((articles) => {
          setCurrentPage(currentPage + 1);
          setArticles(articles);
        });
    }
  };

  const handleCategoriesClick = () => {
    setIsCategoriesOptionOpen(!isCategoriesOptionOpen);
  };

  const handleOverlayClick = () => {
    setIsCategoriesOptionOpen(false);
  };

  const handleCategoriesOptionClick = (e) => {
    const targetCategory = e.currentTarget.dataset.category;

    setCurrentPage(1); // 切換分類就重置頁數
    setTotalPage(); // 切換分類就重置頁數
    setIsCategoriesOptionOpen(false);
    setCurrentCategory(targetCategory);

    if (targetCategory === "all") {
      getAllArticles(1, articlesLimit);
    } else {
      getAllCategoryArticles(1, articlesLimit, targetCategory);
    }
  };

  useEffect(() => {
    if (currentCategory === "all") {
      getAllArticles(currentPage, articlesLimit);
    }

    getCategories().then((categoriesData) => {
      setCategories(categoriesData);
    });
  }, [dispatch, currentPage, getAllArticles, currentCategory]);

  return (
    <Wrapper>
      <Container>
        <Articles>
          {isLoading && <Loading />}
          <TitleCategoryContainer>
            <Title>
              {currentCategory !== "all" && <FolderIcon />}
              {currentCategory === "all" ? "所有文章" : currentCategory}
            </Title>
            <CategoryContainer>
              <DownArrowIcon onClick={handleCategoriesClick} />
              <CategoryDefault
                onClick={handleCategoriesClick}
                isOpen={isCategoriesOptionOpen}
              >
                文章類別
              </CategoryDefault>
              {isCategoriesOptionOpen && (
                <>
                  <Overlay onClick={handleOverlayClick} />
                  <CategoriesOption>
                    <Category
                      onClick={handleCategoriesOptionClick}
                      data-category="all"
                    >
                      所有文章
                    </Category>
                    {categories.map((category) => (
                      <Category
                        key={category.id}
                        onClick={handleCategoriesOptionClick}
                        data-category={category.name}
                      >
                        {category.name}
                      </Category>
                    ))}
                  </CategoriesOption>
                </>
              )}
            </CategoryContainer>
          </TitleCategoryContainer>
          {articles.map((article) => (
            <ArticleFullVersion
              key={article.id}
              article={article}
              hideCoverImage={!article.coverImage}
            />
          ))}
        </Articles>
        {articles.length > 0 ? (
          <Pagination>
            {currentPage !== 1 && <PreviousIcon onClick={handlePreviousPage} />}
            <Page>{currentPage}</Page>
            {currentPage !== totalPage && <NextIcon onClick={handleNextPage} />}
          </Pagination>
        ) : (
          <EmptyDataTitle>目前沒有文章。</EmptyDataTitle>
        )}
      </Container>
    </Wrapper>
  );
}
