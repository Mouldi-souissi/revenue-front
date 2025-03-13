import create from "zustand";
import { MOVE_SUBTYPES, MoveSubType, Period } from "../constants";
import {
  getMoves,
  addMove,
  deleteMove,
  getRevenue,
  getHistory,
  reset,
} from "../api/move";

import { Move, MovePayload, Revenue } from "../models/Move";
import { History } from "../models/History";

interface MoveState {
  moves: Move[];
  spending: Move[];
  wins: Move[];
  sales: Move[];
  revenue: Revenue;
  history: History[];

  // actions
  getMoves: (period?: Period, subType?: MoveSubType) => Promise<void>;
  addMove: (move: MovePayload) => Promise<boolean>;
  deleteMove: (id: string) => Promise<boolean>;
  getRevenue: (start: string, end: string, user?: string) => Promise<void>;
  getHistory: (start: string, end: string) => Promise<void>;
  reset: (password: string) => Promise<boolean>;
}

const defaultRevenue: Revenue = {
  totalSales: 0,
  totalWins: 0,
  totalSpending: 0,
  revenue: 0,
};

const store_move = create<MoveState>((set) => ({
  moves: [],
  spending: [],
  wins: [],
  sales: [],
  revenue: defaultRevenue,
  history: [],

  getMoves: async (period = "daily", subType = "all") => {
    try {
      const data = await getMoves(period, subType);
      if (subType === MOVE_SUBTYPES.win) {
        set({ wins: data });
      }
      if (subType === MOVE_SUBTYPES.spending) {
        set({ spending: data });
      }
      if (subType === MOVE_SUBTYPES.sale) {
        set({ sales: data });
      }
      set({ moves: data });
    } catch (err) {
      console.log(err);
    }
  },

  addMove: async (move) => {
    try {
      const data = await addMove(move);
      if (data.subType === MOVE_SUBTYPES.win) {
        set((state) => ({
          wins: [...state.wins, data],
        }));
      }
      if (data.subType === MOVE_SUBTYPES.spending) {
        set((state) => ({
          spending: [...state.spending, data],
        }));
      }
      if (data.subType === MOVE_SUBTYPES.sale) {
        set((state) => ({
          sales: [...state.sales, data],
        }));
      }
      set((state) => ({
        moves: [...state.moves, data],
      }));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  deleteMove: async (id) => {
    try {
      const data = await deleteMove(id);
      if (data.subType === MOVE_SUBTYPES.win) {
        set((state) => ({
          wins: state.wins.filter((doc) => doc._id !== data._id),
        }));
      }
      if (data.subType === MOVE_SUBTYPES.spending) {
        set((state) => ({
          spending: state.spending.filter((doc) => doc._id !== data._id),
        }));
      }
      if (data.subType === MOVE_SUBTYPES.sale) {
        set((state) => ({
          sales: state.sales.filter((doc) => doc._id !== data._id),
        }));
      }
      set((state) => ({
        moves: state.moves.filter((doc) => doc._id !== data._id),
      }));
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  getRevenue: async (start, end, user = "all") => {
    try {
      const data = await getRevenue(start, end, user);
      set({ revenue: data });
    } catch (err) {
      console.log(err);
    }
  },

  getHistory: async (start, end) => {
    try {
      const data = await getHistory(start, end);
      set({ history: data });
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
      return false;
    }
  },
}));

export default store_move;
