import httpClient from "../libs/httpClient";
import { getHeaders } from "../helpers/getHeaders";
import { Account } from "../models/Account";

const getAccounts = async (): Promise<Account[]> => {
  return httpClient.get<Account[]>("/accounts", getHeaders());
};

const addAccount = (account: Account): Promise<Account> => {
  return httpClient.post<Account>("/accounts", account, getHeaders());
};

const deleteAccount = (id: string): Promise<Account> => {
  return httpClient.delete<Account>(`/accounts/${id}`, getHeaders());
};

const editAccount = (id: string, account: Account): Promise<Account> => {
  return httpClient.put<Account>(`/accounts/${id}`, account, getHeaders());
};

export { getAccounts, addAccount, deleteAccount, editAccount };
