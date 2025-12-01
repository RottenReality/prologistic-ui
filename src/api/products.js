import api from "./client";

const API_ROUTE = "/v1/products";

export const getProducts = (params = {}) => {
  return api.get(API_ROUTE + "/", { params });
};

export const getProductById = (id) => {
  return api.get(`${API_ROUTE}/${id}/`);
};

export const createProduct = (data) => {
  return api.post(API_ROUTE + "/", data);
};

export const updateProduct = (id, data) => {
  return api.put(`${API_ROUTE}/${id}/`, data);
};

export const deleteProduct = (id) => {
  return api.delete(`${API_ROUTE}/${id}/`);
};