import create from "zustand";
import axios from "axios";
import decode from "jwt-decode";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://revenue-api.vercel.app/api";

axios.interceptors.response.use(
  (response) => response, // Simply return the response for successful requests
  (error) => {
    console.log("yo");
    const msg = error.response ? error.response.data : null;

    if (msg === "invalid token") {
      sessionStorage.removeItem("token");
      window.location.replace("/login");
    }

    return Promise.reject(error); // Reject the promise to indicate an error
  },
);

const useStore = create((set, get) => ({
  isSidebarHidden: false,
  activeTab: "dashboard",
  users: [],
  username: "User",
  userType: "",
  isLoading: false,
  shop: "aouina",
  shops: [],
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
    { link: "dashboard", icon: "fas fa-desktop", text: "Tableau de bord" },
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
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        set({ users: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  login: (email, password, shop = "aouina") => {
    axios
      .post(`${API_URL}/user/login`, { email, password, shop })
      .then((res) => {
        sessionStorage.setItem("token", res.data);
        const decodedToken = decode(res.data);
        set({
          username: decodedToken.name,
          userType: decodedToken.type,
          activeTab: decodedToken.type === "admin" ? "dashboard" : "sales",
          shop: decodedToken.shop,
        });
        window.location.replace("/");
      })
      .catch((err) => console.log(err));
  },
  logout: () => {
    window.sessionStorage.removeItem("token");
    window.location.replace("/login");
  },

  checkAuth: () => {
    const token =
      sessionStorage.getItem("token") && sessionStorage.getItem("token");
    const decodedToken = token && decode(token);

    if (!decodedToken?.shop) {
      sessionStorage.removeItem("token");
      window.location.replace("/login");
    }
    set({
      username: decodedToken?.name,
      userType: decodedToken?.type,
      activeTab: decodedToken?.type === "admin" ? "dashboard" : "sales",
      shop: decodedToken.shop,
    });
  },

  addUser: (userData) => {
    set({ isLoading: true });
    axios
      .post(`${API_URL}/user/register`, userData, {
        headers: { token: sessionStorage.getItem("token") },
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
        headers: { token: sessionStorage.getItem("token") },
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
          headers: { token: sessionStorage.getItem("token") },
        },
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
  fondState: 1,

  getAccounts: async () => {
    try {
      const res = await axios.get(`${API_URL}/account`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set({
        accounts: res.data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  addAccount: (account) => {
    set({ isLoading: true });
    axios
      .post(`${API_URL}/account`, account, {
        headers: { token: sessionStorage.getItem("token") },
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
        headers: { token: sessionStorage.getItem("token") },
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
        headers: { token: sessionStorage.getItem("token") },
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

  getSpending: async () => {
    try {
      const res = await axios.get(`${API_URL}/move/spending`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set({
        spending: res.data,
      });
      return res.data;
    } catch (error) {
      console.log(err);
    } finally {
      set({ isLoading: false });
    }
  },

  getWins: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/move/wins`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        set({
          wins: res.data,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  addMove: async (move) => {
    set({ isLoading: true });
    axios
      .post(`${API_URL}/move`, move, {
        headers: { token: sessionStorage.getItem("token") },
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
        if (res.data.subType === "retrait") {
          get().getMoves("daily");
          get().getAccounts();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  totalWins: 0,
  getTotalWins: async (account) => {
    return axios
      .get(`${API_URL}/move/totalWins/${account}`, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  },

  editMove: (move) => {
    axios
      .put(`${API_URL}/move/${move._id}`, move, {
        headers: { token: sessionStorage.getItem("token") },
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
        headers: { token: sessionStorage.getItem("token") },
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

        set((state) => ({
          moves: state.moves.filter((doc) => doc._id !== res.data._id),
        }));
        get().getAccounts();
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
        headers: { token: sessionStorage.getItem("token") },
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
        headers: { token: sessionStorage.getItem("token") },
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
        headers: { token: sessionStorage.getItem("token") },
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
  getAllshops: async () => {
    try {
      const res = await axios.get(`${API_URL}/shop`);

      set({ shops: res.data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useStore;
