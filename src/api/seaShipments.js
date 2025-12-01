import api from "./client";

const API_ROUTE = "/v1/sea-shipments";

export const getSeaShipments = (params = {}) => {
  return api.get(API_ROUTE + "/", { params });
};

export const getSeaShipmentById = (id) => {
  return api.get(`${API_ROUTE}/${id}/`);
};

export const createSeaShipment = (data) => {
  return api.post(API_ROUTE + "/", data);
};

export const updateSeaShipment = (id, data) => {
  return api.put(`${API_ROUTE}/${id}/`, data);
};

export const deleteSeaShipment = (id) => {
  return api.delete(`${API_ROUTE}/${id}/`);
};