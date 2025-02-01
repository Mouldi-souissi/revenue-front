import create from "zustand";
import { MOVE_SUBTYPES } from "../constants";
import {
  getMoves,
  addMove,
  deleteMove,
  getRevenue,
  getHistory,
  reset,
} from "../api/move";

const defaultRevenue = {
  totalSales: 0,
  totalWins: 0,
  totalSpending: 0,
  revenue: 0,
};

const store_move = create((set) => ({
  moves: [],
  spending: [],
  wins: [],
  sales: [],
  revenue: defaultRevenue,
  history: [],

  getMoves: async (period = "daily", subType = "all") => {
    try {
      const res = await getMoves(period, subType);

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
      const res = await addMove(move);

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
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  deleteMove: async (id) => {
    try {
      const res = await deleteMove(id);

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

      return true;
    } catch (err) {
      console.log(err);
    }
  },

  getRevenue: async (start, end, user = "all") => {
    try {
      const res = await getRevenue(start, end, user);
      set({ revenue: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  getHistory: async (start, end) => {
    try {
      const res = await getHistory(start, end);
      set({ history: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  reset: async (data) => {
    try {
      await reset(data);

      set({ moves: [] });
      return true;
    } catch (err) {
      console.log(err);
    }
  },
}));

export default store_move;
