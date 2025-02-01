import httpClient from "../libs/httpClient";
import { getHeaders } from "../helpers/getHeaders";

const getMoves = (period, subType) => {
  return httpClient.get(`/moves/${period}/${subType}`, getHeaders());
};

const addMove = (move) => {
  return httpClient.post(`/moves`, move, getHeaders());
};

const deleteMove = (id) => {
  return httpClient.delete(`/moves/${id}`, getHeaders());
};

const getRevenue = (start, end, user) => {
  return httpClient.get(`/moves/revenue/${start}/${end}/${user}`, getHeaders());
};

const getHistory = (start, end) => {
  return httpClient.get(`/history/${start}/${end}`, getHeaders());
};

const reset = (data) => {
  return httpClient.post(`/moves/resetShop`, data, getHeaders());
};

export { getMoves, addMove, deleteMove, getRevenue, getHistory, reset };
