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

      set((state) => ({ accounts: [...state.accounts, res.data] }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  deleteAccount: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/accounts/${id}`, getHeaders());
      set((state) => ({
        accounts: state.accounts.filter((site) => site._id !== res.data._id),
      }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  editAccount: async (id, account) => {
    try {
      const res = await axios.put(
        `${API_URL}/accounts/${id}`,
        account,
        getHeaders(),
      );
      set((state) => ({
        accounts: [
          ...state.accounts.filter((doc) => doc._id !== res.data._id),
          res.data,
        ],
      }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },
}));

export default store_account;
