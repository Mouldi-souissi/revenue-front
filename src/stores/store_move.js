import create from "zustand";
import axios from "axios";
import { API_URL } from "../constants";
import { MOVE_SUBTYPES } from "../constants";

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
  revenue: defaultRevenue,
  history: [],

  getMoves: async (period = "daily", subType = "all") => {
    try {
      const res = await axios.get(`${API_URL}/move/${period}/${subType}`, {
        headers: { token: sessionStorage.getItem("token") },
      });

      if (subType === MOVE_SUBTYPES.win) {
        set({ wins: res.data });
      }
      if (subType === MOVE_SUBTYPES.spending) {
        set({ spending: res.data });
      }
      if (subType === MOVE_SUBTYPES.sale) {
        set({ sales: res.data });
      }

      set({ moves: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  addMove: async (move) => {
    try {
      const res = await axios.post(`${API_URL}/move`, move, {
        headers: { token: sessionStorage.getItem("token") },
      });

      if (res.data.subType === MOVE_SUBTYPES.win) {
        set((state) => ({
          wins: [...state.wins, res.data],
        }));
      }
      if (res.data.subType === MOVE_SUBTYPES.spending) {
        set((state) => ({
          spending: [...state.spending, res.data],
        }));
      }
      if (res.data.subType === MOVE_SUBTYPES.sale) {
        set((state) => ({
          sales: [...state.sales, res.data],
        }));
      }

      set((state) => ({
        moves: [...state.moves, res.data],
      }));
    } catch (err) {
      console.log(err);
    }
  },

  deleteMove: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/move/${id}`, {
        headers: { token: sessionStorage.getItem("token") },
      });

      if (res.data.subType === MOVE_SUBTYPES.win) {
        set((state) => ({
          wins: state.wins.filter((doc) => doc._id !== res.data._id),
        }));
      }
      if (res.data.subType === MOVE_SUBTYPES.spending) {
        set((state) => ({
          spending: state.spending.filter((doc) => doc._id !== res.data._id),
        }));
      }
      if (res.data.subType === MOVE_SUBTYPES.sale) {
        set((state) => ({
          sales: state.sales.filter((doc) => doc._id !== res.data._id),
        }));
      }

      set((state) => ({
        moves: state.moves.filter((doc) => doc._id !== res.data._id),
      }));
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
