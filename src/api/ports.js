import api from "./client";

const API_ROUTE = "/v1/ports";

export const getPorts = (params = {}) => {
  return api.get(API_ROUTE + "/", { params });
};

export const getPortById = (id) => {
  return api.get(`${API_ROUTE}/${id}/`);
};

export const createPort = (data) => {
  return api.post(API_ROUTE + "/", data);
};

export const updatePort = (id, data) => {
  return api.put(`${API_ROUTE}/${id}/`, data);
};

export const deletePort = (id) => {
  return api.delete(`${API_ROUTE}/${id}/`);
};