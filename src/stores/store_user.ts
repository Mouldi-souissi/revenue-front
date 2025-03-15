import create from "zustand";
import { decodeToken } from "../libs/token";
import { navigate } from "wouter/use-browser-location";
import { USER_ROLES, UserRole } from "../constants";
import { ADMIN_ROUTES, USER_ROUTES } from "../routes/routes";
import { login, getUsers, addUser, deleteUser, editUser } from "../api/user";
import { User, UserPayload } from "../models/User";
import { Route } from "../models/Route";
import { DecodedToken } from "../models/DecodedToken";
import storage from "../libs/storage";

type UserState = {
  activeRoute: string;
  username: string;
  userId: string;
  role: UserRole;
  shop: string;
  routes: Route[];
  isAuthenticated: boolean;
  users: User[];

  // Actions
  switchRoute: (route: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  checkAuth: () => void;
  logout: () => void;
  getUsers: () => Promise<void>;
  addUser: (userData: UserPayload) => Promise<boolean | undefined>;
  deleteUser: (id: string) => Promise<boolean | undefined>;
  editUser: (user: User) => Promise<boolean | undefined>;
};

const getRoutes = (role: string): Route[] => {
  if (role === USER_ROLES.ADMIN) {
    return ADMIN_ROUTES;
  }
  if (role === USER_ROLES.USER) {
    return USER_ROUTES;
  }
  return USER_ROUTES;
};

const store_user = create<UserState>((set) => ({
  activeRoute: "",
  username: "",
  userId: "",
  role: USER_ROLES.USER,
  shop: "",
  routes: [],
  isAuthenticated: false,
  users: [],

  switchRoute: (route) => {
    set({ activeRoute: route });
    storage.setItem("activeRoute", route);
  },

  login: async (email, password) => {
    try {
      const data = await login(email, password);
      if (!data) {
        return false;
      }
      storage.setItem("token", data);

      const decodedToken = decodeToken<DecodedToken>(data);

      if (!decodedToken) {
        console.error("Failed to decode token");
        return false;
      }

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
      return false;
    }
  },

  checkAuth: () => {
    try {
      const token = storage.getItem<string>("token");
      if (!token) return;
      const decodedToken = decodeToken<DecodedToken>(token);
      const activeRoute = storage.getItem<string>("activeRoute") || "/";

      if (token && decodedToken && activeRoute) {
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
    storage.clear();
    set({
      isAuthenticated: false,
    });
    navigate("/login", { replace: true });
  },

  getUsers: async () => {
    try {
      const data = (await getUsers()) as User[];
      set({ users: data });
    } catch (err) {
      console.log(err);
    }
  },

  addUser: async (userData) => {
    try {
      const data = await addUser(userData);
      set((state) => ({ users: [...state.users, data] }));
      return true;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  deleteUser: async (id) => {
    try {
      const data = await deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user._id !== data._id),
      }));
      return true;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  editUser: async (user) => {
    try {
      const data = await editUser(user);
      set((state) => ({
        users: [...state.users.filter((u) => u._id !== data._id), data],
      }));
      return true;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
}));

export default store_user;
