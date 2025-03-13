import create from "zustand";
import {
  getAccounts,
  addAccount,
  deleteAccount,
  editAccount,
} from "../api/account";
import { Account, AccountPayload, defaultAccount } from "../models/Account";

interface AccountState {
  accounts: Account[];
  selectedAccount: Account;

  // actions
  selectAccount: (account: Account) => void;
  resetAccount: () => void;
  getAccounts: () => Promise<Account[] | undefined>;
  addAccount: (account: AccountPayload) => Promise<boolean | undefined>;
  deleteAccount: (id: string) => Promise<boolean | undefined>;
  editAccount: (id: string, account: Account) => Promise<boolean | undefined>;
}

const store_account = create<AccountState>((set) => ({
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
      const data = await getAccounts();
      set({
        accounts: data,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  addAccount: async (account) => {
    try {
      const data = await addAccount(account);

      set((state) => ({ accounts: [...state.accounts, data] }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  deleteAccount: async (id) => {
    try {
      const data = await deleteAccount(id);
      set((state) => ({
        accounts: state.accounts.filter((site) => site._id !== data._id),
      }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  editAccount: async (id, account) => {
    try {
      const data = await editAccount(id, account);
      set((state) => ({
        accounts: [
          ...state.accounts.filter((doc) => doc._id !== data._id),
          data,
        ],
      }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },
}));

export default store_account;
