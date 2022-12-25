import create from "zustand";
import axios from "axios";
import decode from "jwt-decode";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://revenue-api.vercel.app/api";

const useStore = create((set, get) => ({
  isSidebarHidden: false,
  activeTab: "dashboard",
  users: [],
  username: "User",
  userType: "",
  isLoading: false,
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
    set({ isLoading: true });
    axios
      .get(`${API_URL}/user`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ users: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  login: (email, password) => {
    axios
      .post(`${API_URL}/user/login`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data);
        const decodedToken = decode(res.data);
        set({
          username: decodedToken.name,
          userType: decodedToken.type,
          activeTab: decodedToken.type === "admin" ? "dashboard" : "sales",
        });
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
    set({ isLoading: true });
    axios
      .post(`${API_URL}/user/register`, userData, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({ users: [...state.users, res.data] }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  deleteUser: (id) => {
    set({ isLoading: true });
    axios
      .delete(`${API_URL}/user/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({
          users: state.users.filter((user) => user._id !== res.data._id),
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  editUser: (user) => {
    set({ isLoading: true });
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
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
  // accounts
  accounts: [],

  getAccounts: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/account`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ accounts: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
  addAccount: (account) => {
    set({ isLoading: true });
    axios
      .post(`${API_URL}/account`, account, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({ accounts: [...state.accounts, res.data] }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
  deleteAccount: (id) => {
    set({ isLoading: true });
    axios
      .delete(`${API_URL}/account/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({
          accounts: state.accounts.filter((site) => site._id !== res.data._id),
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
  editAccount: (account) => {
    set({ isLoading: true });
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
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  // moves
  spending: [],
  wins: [],
  moves: [],

  getSpending: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/move/spending`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({
          spending: res.data,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  getWins: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/move/wins`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("wins", res.data);
        set({
          wins: res.data,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  addMove: (move) => {
    set({ isLoading: true });
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
        if (res.data.subType === "versement") {
          set((state) => ({
            moves: [...state.moves, res.data],
          }));
          get().getAccounts();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
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
    set({ isLoading: true });
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
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  sales: [],
  getMoves: (period = "daily") => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/move/${period}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ moves: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  getSales: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/move/sales`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ sales: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
  deleteAllMoves: () => {
    set({ isLoading: true });
    axios
      .delete(`${API_URL}/move`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({
          moves: [],
        });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export default useStore;
