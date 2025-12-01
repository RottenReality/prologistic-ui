import api from "./client";

const API_ROUTE = "/v1/warehouses";

export const getWarehouses = (params = {}) => {
  return api.get(API_ROUTE + "/", { params });
};

export const getWarehouseById = (id) => {
  return api.get(`${API_ROUTE}/${id}/`);
};

export const createWarehouse = (data) => {
  return api.post(API_ROUTE + "/", data);
};

export const updateWarehouse = (id, data) => {
  return api.put(`${API_ROUTE}/${id}/`, data);
};

export const deleteWarehouse = (id) => {
  return api.delete(`${API_ROUTE}/${id}/`);
};