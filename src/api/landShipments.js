import api from "./client";

const API_ROUTE = "/v1/land-shipments";

export const getLandShipments = (params = {}) => {
  return api.get(API_ROUTE + "/", { params });
};

export const getLandShipmentById = (id) => {
  return api.get(`${API_ROUTE}/${id}/`);
};

export const createLandShipment = (data) => {
  return api.post(API_ROUTE + "/", data);
};

export const updateLandShipment = (id, data) => {
  return api.put(`${API_ROUTE}/${id}/`, data);
};

export const deleteLandShipment = (id) => {
  return api.delete(`${API_ROUTE}/${id}/`);
};