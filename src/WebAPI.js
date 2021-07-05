import { getAuthToken } from "./utils";

const BASE_URL = "https://lidemy-blog-json-server.herokuapp.com";

export const getSingleArticle = (id) => {
  return fetch(`${BASE_URL}/articles/${id}?_expand=user`).then((res) =>
    res.json()
  );
};

export const getArticles = (pageNumber, limitNumber) => {
  return fetch(
    `${BASE_URL}/articles?_sort=createdAt&_order=desc&_expand=user&_page=${pageNumber}&_limit=${limitNumber}`
  );
};

export const getAuthorArticles = (userId) => {
  return fetch(
    `${BASE_URL}/articles?userId=${userId}&_sort=createdAt&_order=desc&_expand=user`
  ).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

// 身份驗證
export const getUser = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const register = (username, password, nickname) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const addArticle = (title, category, coverImage, content) => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      category,
      coverImage,
      body: content,
    }),
  }).then((res) => res.json());
};

export const updateArticle = (id, title, category, coverImage, content) => {
  const token = getAuthToken();

  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      category,
      coverImage,
      body: content,
    }),
  }).then((res) => res.json());
};

export const deleteArticle = (id) => {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const getCategories = () => {
  return fetch(`${BASE_URL}/categories`).then((res) => res.json());
};

export const getFilterCategories = (category) => {
  return fetch(`${BASE_URL}/categories?name=${category}`).then((res) => res.json());
};

export const getCategoryArticles = (pageNumber, limitNumber, category) => {
  return fetch(
    `${BASE_URL}/articles?_sort=createdAt&_order=desc&_expand=user&_page=${pageNumber}&_limit=${limitNumber}&category=${category}`
  );
};

export const getAllCategoryArticles = (category) => {
  return fetch(
    `${BASE_URL}/articles?_sort=createdAt&_order=desc&_expand=user&category=${category}`
  ).then((res) => res.json());
};
