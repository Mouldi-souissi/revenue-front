import create from "zustand";
import axios from "axios";
import { API_URL } from "../constants";

const store_shop = create((set, get) => ({
  shops: [],
  getAllshops: async () => {
    try {
      const res = await axios.get(`${API_URL}/shops`);

      if (!res.data) {
        set({ shops: [] });
        return;
      }

      set({ shops: res.data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default store_shop;
