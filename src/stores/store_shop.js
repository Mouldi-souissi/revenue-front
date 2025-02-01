import create from "zustand";
import httpClient from "../api/httpClient";

const store_shop = create((set) => ({
  shops: [],
  getAllshops: async () => {
    try {
      const res = await httpClient.get(`/shops`);

      set({ shops: res.data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default store_shop;
