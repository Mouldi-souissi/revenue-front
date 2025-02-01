import httpClient from "../libs/httpClient";
import { getHeaders } from "../helpers/getHeaders";

const login = async (email, password) => {
  return httpClient.post(`/users/login`, {
    email,
    password,
  });
};

const getUsers = async () => {
  return httpClient.get(`/users`, getHeaders());
};

const addUser = async (userData) => {
  return httpClient.post(`/users/register`, userData, getHeaders());
};

const deleteUser = async (id) => {
  return httpClient.delete(`/users/${id}`, getHeaders());
};

const editUser = async (user) => {
  return httpClient.put(
    `/users/${user._id}`,
    { name: user.name, type: user.type },
    getHeaders(),
  );
};

export { login, getUsers, addUser, deleteUser, editUser };
