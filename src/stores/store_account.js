import create from "zustand";
import axios from "axios";
import { API_URL } from "../constants";
import { getHeaders } from "../helpers/getHeaders";

const defaultAccount = {
  _id: "",
  name: "",
  amount: "",
};

const store_account = create((set, get) => ({
  accounts: [],
  selectedAccount: defaultAccount,

  selectAccount: (account) => {
    set({ selectedAccount: account });
  },

  resetAccount: () => {
    set({ selectedAccount: defaultAccount });
  },

  getAccounts: async () => {
    try {
      const res = await axios.get(`${API_URL}/accounts`, getHeaders());

      if (!res.data) {
        set({
          accounts: [],
        });
        return;
      }
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
      const res = await axios.post(
        `${API_URL}/accounts`,
        account,
        getHeaders(),
      );

      if (!res.data) return;

      set((state) => ({ accounts: [...state.accounts, res.data] }));
    } catch (err) {
      console.log(err);
    }
  },

  deleteAccount: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/accounts/${id}`, getHeaders());
      set((state) => ({
        accounts: state.accounts.filter((site) => site._id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  },

  editAccount: async (account) => {
    try {
      const res = await axios.put(
        `${API_URL}/accounts/${account._id}`,
        account,
        getHeaders(),
      );

      if (!res.data) return;
      set((state) => ({
        accounts: [
          ...state.accounts.filter((doc) => doc._id !== account._id),
          account,
        ],
      }));
    } catch (err) {
      console.log(err);
    }
  },
}));

export default store_account;
