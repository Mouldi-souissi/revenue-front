import create from "zustand";
import axios from "axios";
import decode from "jwt-decode";

const API_URL = "http://localhost:5000/api";

const useStore = create((set) => ({
  isSidebarHidden: false,
  activeTab: "dashboard",
  users: [],
  username: "User",

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },
  switchTab: (tab) => {
    set({ activeTab: tab });
  },

  getUsers: () => {
    axios.get(`${API_URL}/user`).then((res) => {
      set({ users: res.data });
    });
  },

  login: (email, password) => {
    axios.post(`${API_URL}/user/login`, { email, password }).then((res) => {
      localStorage.setItem("token", res.data);
      set({ username: decode(res.data)?.name });
      window.location.replace("/");
    });
  },
  logout: () => {
    window.localStorage.removeItem("token");
    window.location.replace("/login");
  },

  checkAuth: () => {
    const token =
      localStorage.getItem("token") && localStorage.getItem("token");
    const decodedToken = token && decode(token);
    set({ username: decodedToken?.name });
  },
}));

export default useStore;
