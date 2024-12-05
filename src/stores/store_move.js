import create from "zustand";
import axios from "axios";
import { API_URL } from "../constants";

const defaultRevenue = {
  totalSales: 0,
  totalWins: 0,
  totalSpending: 0,
  revenue: 0,
};

const store_move = create((set, get) => ({
  moves: [],
  spending: [],
  wins: [],
  sales: [],
  totalWins: 0,
  revenue: defaultRevenue,
  history: [],

  getMoves: async (period = "daily") => {
    try {
      const res = await axios.get(`${API_URL}/move/${period}`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set({ moves: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  getSpending: async () => {
    try {
      const res = await axios.get(`${API_URL}/move/spending`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set({
        spending: res.data,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  getWins: async () => {
    try {
      const res = await axios.get(`${API_URL}/move/wins`, {
        headers: { token: sessionStorage.getItem("token") },
      });

      set({
        wins: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getSales: async () => {
    try {
      const res = await axios.get(`${API_URL}/move/sales`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set({ sales: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  getTotalWins: async (account) => {
    try {
      const res = await axios.get(`${API_URL}/move/totalWins/${account}`, {
        headers: { token: sessionStorage.getItem("token") },
      });

      set({ totalWins: res.data });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  addMove: async (move) => {
    try {
      const res = await axios.post(`${API_URL}/move`, move, {
        headers: { token: sessionStorage.getItem("token") },
      });

      if (res.data.subType === "gain") {
        set((state) => ({
          wins: [...state.wins, res.data],
        }));
      }
      if (res.data.subType === "dépense") {
        set((state) => ({
          spending: [...state.spending, res.data],
        }));
      }
      if (res.data.subType === "vente") {
        set((state) => ({
          sales: [...state.sales, res.data],
        }));
      }
      if (res.data.subType === "versement") {
        set((state) => ({
          moves: [...state.moves, res.data],
        }));
      }
      if (res.data.subType === "retrait") {
        // get().getMoves("daily");
        // get().getAccounts();
        set((state) => ({
          moves: [...state.moves, res.data],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },

  editMove: async (move) => {
    try {
      const res = await axios.put(`${API_URL}/move/${move._id}`, move, {
        headers: { token: sessionStorage.getItem("token") },
      });
      if (res.data.subType === "gain") {
        set((state) => ({
          wins: [
            ...state.wins.filter((doc) => doc._id !== res.data._id),
            res.data,
          ],
        }));
      }
      if (res.data.subType === "dépense") {
        set((state) => ({
          spending: [
            ...state.spending.filter((doc) => doc._id !== res.data._id),
            res.data,
          ],
        }));
      }
      if (res.data.subType === "vente") {
        set((state) => ({
          sales: [
            ...state.sales.filter((doc) => doc._id !== res.data._id),
            res.data,
          ],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },

  deleteMove: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/move/${id}`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      if (res.data.subType === "gain") {
        set((state) => ({
          wins: state.wins.filter((doc) => doc._id !== res.data._id),
        }));
      }
      if (res.data.subType === "dépense") {
        set((state) => ({
          spending: state.spending.filter((doc) => doc._id !== res.data._id),
        }));
      }
      if (res.data.subType === "vente") {
        set((state) => ({
          sales: state.sales.filter((doc) => doc._id !== res.data._id),
        }));
      }

      set((state) => ({
        moves: state.moves.filter((doc) => doc._id !== res.data._id),
      }));

      // get().getAccounts();
    } catch (err) {
      console.log(err);
    }
  },

  getRevenue: async (start, end, user = "all") => {
    try {
      const res = await axios.get(
        `${API_URL}/move/revenue/${start}/${end}/${user}`,
        {
          headers: { token: sessionStorage.getItem("token") },
        },
      );
      set({ revenue: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  getHistory: async (start, end) => {
    try {
      const res = await axios.get(`${API_URL}/history/${start}/${end}`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set({ history: res.data });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default store_move;
