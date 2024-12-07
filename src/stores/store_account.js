import create from "zustand";
import axios from "axios";
import { API_URL } from "../constants";

const store_account = create((set, get) => ({
  accounts: [],

  getAccounts: async () => {
    try {
      const res = await axios.get(`${API_URL}/account`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set({
        accounts: res.data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  addAccount: async (account) => {
    try {
      const res = await axios.post(`${API_URL}/account`, account, {
        headers: { token: sessionStorage.getItem("token") },
      });

      set((state) => ({ accounts: [...state.accounts, res.data] }));
    } catch (err) {
      console.log(err);
    }
  },

  deleteAccount: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/account/${id}`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set((state) => ({
        accounts: state.accounts.filter((site) => site._id !== res.data._id),
      }));
    } catch (err) {
      console.log(err);
    }
  },

  editAccount: async (account) => {
    try {
      const res = await axios.put(
        `${API_URL}/account/${account._id}`,
        account,
        {
          headers: { token: sessionStorage.getItem("token") },
        },
      );
      set((state) => ({
        accounts: [
          ...state.accounts.filter((doc) => doc._id !== res.data._id),
          res.data,
        ],
      }));
    } catch (err) {
      console.log(err);
    }
  },
}));

export default store_account;
