import create from "zustand";
import decode from "jwt-decode";
import axios from "axios";
import { API_URL } from "../constants";
import { navigate } from "wouter/use-browser-location";
import { USER_ROLES, ADMIN_ROUTES, USER_ROUTES } from "../constants";

axios.interceptors.response.use(
  (response) => response, // Simply return the response for successful requests
  (error) => {
    const msg = error.response ? error.response.data : null;

    if (msg === "invalid token") {
      sessionStorage.removeItem("token");
      navigate("/login", { replace: true });
    }

    return Promise.reject(error); // Reject the promise to indicate an error
  },
);

const store_user = create((set, get) => ({
  isSidebarHidden: false,
  activeTab: "/",
  username: "User",
  userType: "admin",
  shop: "aouina",
  routes: [],
  isAuthenticated: false,
  users: [],
  loginError: "",

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },

  switchTab: (tab) => {
    set({ activeTab: tab });
    sessionStorage.setItem("activeTab", tab);
  },

  getUsers: async () => {
    try {
      const res = await axios.get(`${API_URL}/user`, {
        headers: { token: sessionStorage.getItem("token") },
      });

      set({ users: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  login: async (email, password, shop = "aouina") => {
    try {
      set({ loginError: "" });
      const res = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
        shop,
      });

      sessionStorage.setItem("token", res.data);
      const decodedToken = decode(res.data);

      if (decodedToken.type === USER_ROLES.ADMIN) {
        set({
          routes: ADMIN_ROUTES,
        });
      }

      if (decodedToken.type === USER_ROLES.USER) {
        set({
          routes: USER_ROUTES,
        });
      }

      set({
        username: decodedToken.name,
        userType: decodedToken.type,
        shop: decodedToken.shop,
        activeTab: "/",
        isAuthenticated: true,
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);

      if (err.response.data == "invalid credentials") {
        set({ loginError: "Email et/ou mot de passe incorrect(s)." });
      } else {
        set({ loginError: "Il y a eu un problème technique." });
      }
    }
  },
  logout: () => {
    window.sessionStorage.removeItem("token");
    set({
      isAuthenticated: false,
    });
    navigate("/login", { replace: true });
  },

  checkAuth: () => {
    try {
      const token = sessionStorage.getItem("token") || null;
      const activeTab = sessionStorage.getItem("activeTab") || "/";

      if (token) {
        const decodedToken = decode(token) || null;

        if (decodedToken.type === USER_ROLES.ADMIN) {
          set({
            routes: ADMIN_ROUTES,
          });
        }

        if (decodedToken.type === USER_ROLES.USER) {
          set({
            routes: USER_ROUTES,
          });
        }

        set({
          username: decodedToken.name,
          userType: decodedToken.type,
          shop: decodedToken.shop,
          activeTab: activeTab,
          isAuthenticated: true,
        });

        navigate(activeTab, { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      navigate("/login", { replace: true });
      console.log(err);
    }
  },

  addUser: async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/user/register`, userData, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set((state) => ({ users: [...state.users, res.data] }));
    } catch (err) {
      console.log(err);
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/user/${id}`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      set((state) => ({
        users: state.users.filter((user) => user._id !== res.data._id),
      }));
    } catch (err) {
      console.log(error);
    }
  },

  editUser: async (user) => {
    try {
      const res = await axios.put(
        `${API_URL}/user/${user._id}`,
        { name: user.name, type: user.type },
        {
          headers: { token: sessionStorage.getItem("token") },
        },
      );

      set((state) => ({
        users: [
          ...state.users.filter((user) => user._id !== res.data._id),
          res.data,
        ],
      }));
    } catch (err) {
      console.log(err);
    }
  },
}));

export default store_user;
