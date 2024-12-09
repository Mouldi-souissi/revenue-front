import create from "zustand";
import axios from "axios";
import { API_URL } from "../constants";

const store_ui = create((set, get) => ({
  isSidebarHidden: false,

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },
}));

export default store_ui;
