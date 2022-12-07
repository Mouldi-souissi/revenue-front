import create from "zustand";
import axios from "axios";

const API_URL = "https://beta-server-1nddqixrz-mouldi-souissi.vercel.app/api";

const useStore = create((set) => ({
  isSidebarHidden: false,
  activeTab: "dashboard",

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },
  switchTab: (tab) => {
    set({ activeTab: tab });
  },
}));

export default useStore;
