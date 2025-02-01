import create from "zustand";
import {
  getAccounts,
  addAccount,
  deleteAccount,
  editAccount,
} from "../api/account";

const defaultAccount = {
  _id: "",
  name: "",
  amount: "",
};

const store_account = create((set) => ({
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
      const res = await getAccounts();
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
      const res = await addAccount(account);

      set((state) => ({ accounts: [...state.accounts, res.data] }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  deleteAccount: async (id) => {
    try {
      const res = await deleteAccount(id);
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
      const res = await editAccount(id, account);
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
