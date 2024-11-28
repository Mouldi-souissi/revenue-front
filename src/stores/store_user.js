import create from "zustand";
import decode from "jwt-decode";
import axios from "axios";
import { API_URL } from "../constants";
import { navigate } from "wouter/use-browser-location";

axios.interceptors.response.use(
  (response) => response, // Simply return the response for successful requests
  (error) => {
    const msg = error.response ? error.response.data : null;

    if (msg === "invalid token") {
      sessionStorage.removeItem("token");
      window.location.replace("/login");
    }

    return Promise.reject(error); // Reject the promise to indicate an error
  },
);

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};

const ADMIN_ROUTES = [
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
];

const USER_ROUTES = [
  { link: "dashboard", icon: "fas fa-desktop", text: "Tableau de bordd" },
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
];

const store_user = create((set, get) => ({
  isSidebarHidden: false,
  activeTab: "dashboard",
  username: "User",
  userType: "admin",
  isLoading: false,
  shop: "aouina",
  redirectionLink: "/",

  routes: [],
  isAuthenticated: false,

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },

  switchTab: (tab) => {
    set({ activeTab: tab });
  },

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

        if (decodedToken.type === USER_ROLES.ADMIN) {
          set({
            activeTab: "dashboard",
            routes: ADMIN_ROUTES,
            redirectionLink: "/dashboard",
          });
        }

        if (decodedToken.type === USER_ROLES.USER) {
          set({
            activeTab: "sales",
            routes: USER_ROUTES,
            redirectionLink: "/sales",
          });
        }

        set({
          username: decodedToken.name,
          userType: decodedToken.type,
          shop: decodedToken.shop,
        });
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  },
  logout: () => {
    window.sessionStorage.removeItem("token");
    window.location.replace("/login");
  },

  checkAuth: () => {
    try {
      const token = sessionStorage.getItem("token") || null;

      if (!token) throw new Error("no token");

      const decodedToken = decode(token) || null;

      if (!decodedToken) throw new Error("token decode err");

      if (decodedToken.type === USER_ROLES.ADMIN) {
        set({
          activeTab: "dashboard",
          routes: ADMIN_ROUTES,
          redirectionLink: "/dashboard",
        });
      }

      if (decodedToken.type === USER_ROLES.USER) {
        set({
          activeTab: "sales",
          routes: USER_ROUTES,
          redirectionLink: "/sales",
        });
      }

      set({
        username: decodedToken.name,
        userType: decodedToken.type,
        shop: decodedToken.shop,
        isAuthenticated: true,
      });
    } catch (err) {
      // sessionStorage.removeItem("token");
      // window.location.replace("/login");

      navigate("/login", { replace: true });

      // console.log(err);
    }
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
}));

export default store_user;
