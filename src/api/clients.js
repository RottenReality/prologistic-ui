import api from "./client";

export const getClients = (params = {}) => {
  return api.get("/v1/clients/", { params });
};

export const getClientById = (id) => {
  return api.get(`/v1/clients/${id}/`);
};

export const createClient = (data) => {
  return api.post("/v1/clients/", data);
};

export const updateClient = (id, data) => {
  return api.put(`/v1/clients/${id}/`, data);
};

export const deleteClient = (id) => {
  return api.delete(`/v1/clients/${id}/`);
};