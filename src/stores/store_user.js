import create from "zustand";
import decode from "jwt-decode";
import axios from "axios";
import { API_URL } from "../constants";
import { navigate } from "wouter/use-browser-location";
import { USER_ROLES } from "../constants";
import { ADMIN_ROUTES, USER_ROUTES } from "../routes/routes";
import { getHeaders } from "../helpers/getHeaders";

axios.interceptors.response.use(
  (response) => response, // Simply return the response for successful requests
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      sessionStorage.removeItem("token");
      navigate("/login", { replace: true });
    }

    return Promise.reject(error); // Reject the promise to indicate an error
  },
);

const store_user = create((set, get) => ({
  activeRoute: "",
  username: "",
  userId: "",
  role: "",
  shop: "",
  routes: [],
  isAuthenticated: false,
  users: [],
  loginError: "",

  switchRoute: (route) => {
    set({ activeRoute: route });
    sessionStorage.setItem("activeRoute", route);
  },

  login: async (email, password) => {
    try {
      set({ loginError: "" });
      const res = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      sessionStorage.setItem("token", res.data);
      const decodedToken = decode(res.data);

      const { type, name, shop, shopId, _id } = decodedToken;

      if (type === USER_ROLES.ADMIN) {
        set({
          routes: ADMIN_ROUTES,
        });
      }

      if (type === USER_ROLES.USER) {
        set({
          routes: USER_ROUTES,
        });
      }

      set({
        username: name,
        role: type,
        shop: shop,
        activeRoute: "/",
        isAuthenticated: true,
        userId: _id,
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

  checkAuth: () => {
    try {
      const token = sessionStorage.getItem("token") || null;
      const activeRoute = sessionStorage.getItem("activeRoute") || "/";

      if (token) {
        const decodedToken = decode(token) || null;

        const { type, name, shop, shopId, _id } = decodedToken;

        if (type === USER_ROLES.ADMIN) {
          set({
            routes: ADMIN_ROUTES,
          });
        }

        if (type === USER_ROLES.USER) {
          set({
            routes: USER_ROUTES,
          });
        }

        set({
          username: name,
          role: type,
          shop: shop,
          activeRoute: "/",
          isAuthenticated: true,
          userId: _id,
        });

        navigate(activeRoute, { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      navigate("/login", { replace: true });
      console.log(err);
    }
  },

  logout: () => {
    window.sessionStorage.removeItem("token");
    set({
      isAuthenticated: false,
    });
    navigate("/login", { replace: true });
  },

  getUsers: async () => {
    try {
      const res = await axios.get(`${API_URL}/users`, getHeaders());

      set({ users: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  addUser: async (userData) => {
    try {
      const res = await axios.post(
        `${API_URL}/users/register`,
        userData,
        getHeaders(),
      );
      set((state) => ({ users: [...state.users, res.data] }));
    } catch (err) {
      console.log(err);
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/users/${id}`, getHeaders());
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
        `${API_URL}/users/${user._id}`,
        { name: user.name, type: user.type },
        getHeaders(),
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
