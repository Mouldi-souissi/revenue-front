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

  //*********  user
  getUsers: () => {
    axios
      .get(`${API_URL}/user`)
      .then((res) => {
        set({ users: res.data });
      })
      .catch((err) => console.log(err));
  },

  login: (email, password) => {
    axios
      .post(`${API_URL}/user/login`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data);
        set({ username: decode(res.data)?.name });
        window.location.replace("/");
      })
      .catch((err) => console.log(err));
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

  addUser: (userData) => {
    axios
      .post(`${API_URL}/user/register`, userData)
      .then((res) => {
        set((state) => ({ users: [...state.users, res.data] }));
      })
      .catch((err) => console.log(err));
  },

  deleteUser: (id) => {
    axios
      .delete(`${API_URL}/user/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({
          users: state.users.filter((user) => user._id !== res.data._id),
        }));
      })
      .catch((err) => console.log(err));
  },
  //*********  site
  sites: [],

  getSites: () => {
    axios
      .get(`${API_URL}/site`)
      .then((res) => {
        set({ sites: res.data });
      })
      .catch((err) => console.log(err));
  },

  addSite: (site) => {
    axios
      .post(`${API_URL}/site`, site)
      .then((res) => {
        set((state) => ({ sites: [...state.sites, res.data] }));
      })
      .catch((err) => console.log(err));
  },

  deleteSite: (id) => {
    axios
      .delete(`${API_URL}/site/${id}`)
      .then((res) => {
        set((state) => ({
          sites: state.sites.filter((site) => site._id !== res.data.id),
        }));
      })
      .catch((err) => console.log(err));
  },

  // accounts
  accounts: [],
  addAccount: (account) => {
    axios
      .post(`${API_URL}/account`, account)
      .then((res) => {
        set((state) => ({
          accounts: state.accounts.push(res.data),
        }));
      })
      .catch((err) => console.log(err));
  },
  getAccounts: () => {
    axios
      .get(`${API_URL}/account`)
      .then((res) => {
        set({ accounts: res.data });
      })
      .catch((err) => console.log(err));
  },

  // spending
  inOut: [],
  out: [],
  in: [],
  wins: [],
  spending: [],
  getSpendingAndWins: () => {
    axios
      .get(`${API_URL}/inOut/out`)
      .then((res) => {
        set({ out: res.data });
        if (res.data.length) {
          set({
            wins: res.data.filter((doc) => doc.subType === "gain"),
            spending: res.data.filter((doc) => doc.subType === "dépense"),
          });
        }
      })
      .catch((err) => console.log(err));
  },

  getInOut: () => {
    axios
      .get(`${API_URL}/inOut`)
      .then((res) => {
        set({ inOut: res.data });
      })
      .catch((err) => console.log(err));
  },

  addOutDoc: (outDoc) => {
    axios
      .post(`${API_URL}/inOut`, outDoc, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.subType === "gain") {
          set((state) => ({
            wins: state.wins.push(res.data),
          }));
        }
        if (res.data.subType === "dépense") {
          set((state) => ({
            spending: state.spending.push(res.data),
          }));
        }
      })
      .catch((err) => console.log(err));
  },
}));

export default useStore;
