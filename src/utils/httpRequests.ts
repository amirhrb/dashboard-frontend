import axios from "axios";
import { handleLocalStorage } from "./localstorageFn";
import { CreateArticleDataTypes } from "../../types/types";

const basePath = process.env.NEXT_PUBLIC_API_URL;

export const getArticles = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const token = handleLocalStorage("token");
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Token ${token}`,
  };
  return axios
    .get(`${basePath}/articles?offset=${offset}&limit=${limit}`, {
      headers,
    })
    .then((res) => res)
    .catch((error) => error);
};
export const getArticle = async (slug: string) => {
  const token = handleLocalStorage("token");
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Token ${token}`,
  };
  return axios
    .get(`${basePath}/articles/${slug}`, {
      headers,
    })
    .then((res) => res)
    .catch((error) => error);
};
// post an article
export const postArticle = async (data: CreateArticleDataTypes) => {
  const token = handleLocalStorage("token");
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Token ${token}`,
  };
  return axios
    .post(`${basePath}/articles`, JSON.stringify(data), { headers })
    .then((res) => res)
    .catch((error) => error);
};
// delete article by slug
export const deleteArticle = async (slug: string) => {
  const token = handleLocalStorage("token");
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Token ${token}`,
  };
  return axios
    .delete(`${basePath}/articles/${slug}`, { headers })
    .then((res) => res)
    .catch((error) => error);
};
// edit article by slug
export const editArticle = async ({
  slug,
  data,
}: {
  slug: string;
  data: CreateArticleDataTypes;
}) => {
  const token = handleLocalStorage("token");
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Token ${token}`,
  };
  return axios
    .put(`${basePath}/articles/${slug}`, JSON.stringify(data), { headers })
    .then((res) => res)
    .catch((error) => error);
};
export const getTags = () => {
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };
  return axios
    .get(`${basePath}/tags`, { headers })
    .then((res) => res)
    .catch((error) => error);
};
