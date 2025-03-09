import httpClient from "../libs/httpClient";
import { getHeaders } from "../helpers/getHeaders";
import { User } from "../models/User";

const login = async (email: string, password: string): Promise<string> => {
  return httpClient.post(`/users/login`, {
    email,
    password,
  });
};

const getUsers = async (): Promise<User[]> => {
  return httpClient.get(`/users`, getHeaders());
};

const addUser = async (userData: User): Promise<User> => {
  return httpClient.post(`/users/register`, userData, getHeaders());
};

const deleteUser = async (id: string): Promise<User> => {
  return httpClient.delete(`/users/${id}`, getHeaders());
};

const editUser = async (user: User): Promise<User> => {
  return httpClient.put(
    `/users/${user._id}`,
    { name: user.name, type: user.type },
    getHeaders(),
  );
};

export { login, getUsers, addUser, deleteUser, editUser };
