import create from "zustand";
import axios from "axios";
import decode from "jwt-decode";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://revenue-api.vercel.app/api";
const today = new Date().toISOString();

const useStore = create((set) => ({
  isSidebarHidden: false,
  activeTab: "dashboard",
  users: [],
  username: "User",
  userType: "",
  adminRoutes: [
    { link: "dashboard", icon: "fas fa-desktop", text: "Tableau de bord" },
    { link: "users", icon: "fas fa-user-friends", text: "Utilisateurs" },
    {
      link: "accounts",
      icon: "fa-solid fa-tablet-screen-button",
      text: "Comptes",
    },
    {
      link: "sales",
      icon: "fa-solid fa-up-long green",
      text: "Ventes",
    },
    {
      link: "spending",
      icon: "fa-solid fa-down-long red",
      text: "Dépenses",
    },
    {
      link: "wins",
      icon: "fa-solid fa-circle-dollar-to-slot",
      text: "Gain",
    },
  ],
  userRoutes: [
    {
      link: "sales",
      icon: "fa-solid fa-up-long green",
      text: "Ventes",
    },
    {
      link: "spending",
      icon: "fa-solid fa-down-long red",
      text: "Dépenses",
    },
    {
      link: "wins",
      icon: "fa-solid fa-circle-dollar-to-slot",
      text: "Gain",
    },
  ],

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },
  switchTab: (tab) => {
    set({ activeTab: tab });
  },

  //*********  user
  getUsers: () => {
    axios
      .get(`${API_URL}/user`, {
        headers: { token: localStorage.getItem("token") },
      })
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
    set({
      username: decodedToken?.name,
      userType: decodedToken?.type,
      activeTab: decodedToken?.type === "admin" ? "dashboard" : "sales",
    });
  },

  addUser: (userData) => {
    axios
      .post(`${API_URL}/user/register`, userData, {
        headers: { token: localStorage.getItem("token") },
      })
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

  editUser: (user) => {
    axios
      .put(
        `${API_URL}/user/${user._id}`,
        { name: user.name, type: user.type },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        set((state) => ({
          users: [
            ...state.users.filter((user) => user._id !== res.data._id),
            res.data,
          ],
        }));
      })
      .catch((err) => console.log(err));
  },
  // accounts
  accounts: [],

  getAccounts: () => {
    axios
      .get(`${API_URL}/account`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ accounts: res.data });
      })
      .catch((err) => console.log(err));
  },
  addAccount: (account) => {
    axios
      .post(`${API_URL}/account`, account, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({ accounts: [...state.accounts, res.data] }));
      })
      .catch((err) => console.log(err));
  },
  deleteAccount: (id) => {
    axios
      .delete(`${API_URL}/account/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({
          accounts: state.accounts.filter((site) => site._id !== res.data._id),
        }));
      })
      .catch((err) => console.log(err));
  },
  editAccount: (account) => {
    axios
      .put(`${API_URL}/account/${account._id}`, account, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({
          accounts: [
            ...state.accounts.filter((doc) => doc._id !== res.data._id),
            res.data,
          ],
        }));
      })
      .catch((err) => console.log(err));
  },

  // moves
  spending: [],
  wins: [],
  moves: [],

  getSpending: () => {
    axios
      .get(`${API_URL}/move/spending`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({
          spending: res.data,
        });
      })
      .catch((err) => console.log(err));
  },

  getWins: () => {
    axios
      .get(`${API_URL}/move/wins`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({
          wins: res.data,
        });
      })
      .catch((err) => console.log(err));
  },

  addMove: (move) => {
    axios
      .post(`${API_URL}/move`, move, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
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
      })
      .catch((err) => console.log(err));
  },

  editMove: (move) => {
    axios
      .put(`${API_URL}/move/${move._id}`, move, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
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
      })
      .catch((err) => console.log(err));
  },

  deleteMove: (id) => {
    axios
      .delete(`${API_URL}/move/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
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
      })
      .catch((err) => console.log(err));
  },

  sales: [],
  getMoves: (period = "daily") => {
    axios
      .get(`${API_URL}/move/${period}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ moves: res.data });
      })
      .catch((err) => console.log(err));
  },

  getSales: () => {
    axios
      .get(`${API_URL}/move/sales/${today}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ sales: res.data });
      })
      .catch((err) => console.log(err));
  },
}));

export default useStore;
