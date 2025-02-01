import create from "zustand";
import { decodeToken } from "../helpers/decodeToken";
import { navigate } from "wouter/use-browser-location";
import { USER_ROLES } from "../constants";
import { ADMIN_ROUTES, USER_ROUTES } from "../routes/routes";
import { login, getUsers, addUser, deleteUser, editUser } from "../api/user";

const getRoutes = (role) => {
  if (role === USER_ROLES.ADMIN) {
    return ADMIN_ROUTES;
  }

  if (role === USER_ROLES.USER) {
    return USER_ROUTES;
  }

  return USER_ROUTES;
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
      const res = await login(email, password);

      if (!res.data) {
        return false;
      }

      sessionStorage.setItem("token", res.data);
      const decodedToken = decodeToken(res.data);

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
      const decodedToken = decodeToken(token);
      const activeRoute = sessionStorage.getItem("activeRoute") || "/";

      if (token && decodedToken) {
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
      const res = await getUsers();

      set({ users: res.data });
    } catch (err) {
      console.log(err);
    }
  },

  addUser: async (userData) => {
    try {
      const res = await addUser(userData);
      set((state) => ({ users: [...state.users, res.data] }));
      return true;
    } catch (err) {
      console.log(err);
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await deleteUser(id);
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
      const res = await editUser(user);

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
