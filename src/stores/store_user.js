import create from "zustand";
import decode from "jwt-decode";
import httpClient from "../api/httpClient";
import { navigate } from "wouter/use-browser-location";
import { USER_ROLES } from "../constants";
import { ADMIN_ROUTES, USER_ROUTES } from "../routes/routes";
import { getHeaders } from "../api/getHeaders";

const getRoutes = (role) => {
  let routes = [];
  if (role === USER_ROLES.ADMIN) {
    routes = ADMIN_ROUTES;
  }

  if (role === USER_ROLES.USER) {
    routes = USER_ROUTES;
  }

  return routes;
};

const store_user = create((set) => ({
  activeRoute: "",
  username: "",
  userId: "",
  role: "",
  shop: "",
  routes: [],
  isAuthenticated: false,
  users: [],

  switchRoute: (route) => {
    set({ activeRoute: route });
    sessionStorage.setItem("activeRoute", route);
  },

  login: async (email, password) => {
    try {
      const res = await httpClient.post(`/users/login`, {
        email,
        password,
      });

      if (!res.data) {
        return false;
      }

      sessionStorage.setItem("token", res.data);
      const decodedToken = decode(res.data);

      const { type, name, shop, id } = decodedToken;

      const routes = getRoutes(type);

      set({
        routes,
        userId: id,
        username: name,
        role: type,
        shop: shop,
        activeRoute: "/",
        isAuthenticated: true,
      });

      navigate("/", { replace: true });

      return true;
    } catch (err) {
      console.log(err);
    }
  },

  checkAuth: () => {
    try {
      const token = sessionStorage.getItem("token") || null;
      const activeRoute = sessionStorage.getItem("activeRoute") || "/";

      if (token) {
        const decodedToken = decode(token) || null;

        const { type, name, shop, id } = decodedToken;

        const routes = getRoutes(type);

        set({
          routes,
          userId: id,
          username: name,
          role: type,
          shop: shop,
          activeRoute: activeRoute,
          isAuthenticated: true,
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
      const res = await httpClient.get(`/users`, getHeaders());

      set({ users: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  addUser: async (userData) => {
    try {
      const res = await httpClient.post(
        `/users/register`,
        userData,
        getHeaders(),
      );
      set((state) => ({ users: [...state.users, res.data] }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await httpClient.delete(`/users/${id}`, getHeaders());
      set((state) => ({
        users: state.users.filter((user) => user._id !== res.data._id),
      }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  editUser: async (user) => {
    try {
      const res = await httpClient.put(
        `/users/${user._id}`,
        { name: user.name, type: user.type },
        getHeaders(),
      );

      set((state) => ({
        users: [
          ...state.users.filter((user) => user._id !== res.data._id),
          res.data,
        ],
      }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },
}));

export default store_user;
