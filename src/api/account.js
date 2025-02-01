import httpClient from "../libs/httpClient";
import { getHeaders } from "../helpers/getHeaders";

const getAccounts = () => {
  return httpClient.get(`/accounts`, getHeaders());
};

const addAccount = (account) => {
  return httpClient.post(`/accounts`, account, getHeaders());
};

const deleteAccount = (id) => {
  return httpClient.delete(`/accounts/${id}`, getHeaders());
};

const editAccount = (id, account) => {
  return httpClient.put(`/accounts/${id}`, account, getHeaders());
};

export { getAccounts, addAccount, deleteAccount, editAccount };
