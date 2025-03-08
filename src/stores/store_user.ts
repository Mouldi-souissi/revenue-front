import create from "zustand";
import { decodeToken } from "../helpers/decodeToken";
import { navigate } from "wouter/use-browser-location";
import { USER_ROLES } from "../constants";
import { ADMIN_ROUTES, USER_ROUTES } from "../routes/routes";
import { login, getUsers, addUser, deleteUser, editUser } from "../api/user";
import { User } from "../models/User";
import { Route } from "../models/Route";

type DecodedToken = {
  id: string;
  name: string;
  type: string;
  shop: string;
};

interface UserState {
  activeRoute: string;
  username: string;
  userId: string;
  role: string;
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
  addUser: (userData: User) => Promise<boolean | undefined>;
  deleteUser: (id: string) => Promise<boolean | undefined>;
  editUser: (user: User) => Promise<boolean | undefined>;
}

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
  role: "",
  shop: "",
  routes: [],
  isAuthenticated: false,
  users: [],

  switchRoute: (route: string): void => {
    set({ activeRoute: route });
    sessionStorage.setItem("activeRoute", route);
  },

  login: async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await login(email, password);
      if (!data) {
        return false;
      }
      sessionStorage.setItem("token", data);
      const decodedToken = decodeToken(data) as DecodedToken;
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

  checkAuth: (): void => {
    try {
      const token = sessionStorage.getItem("token") || null;
      const decodedToken = token
        ? (decodeToken(token) as DecodedToken | null)
        : null;
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

  logout: (): void => {
    window.sessionStorage.removeItem("token");
    set({
      isAuthenticated: false,
    });
    navigate("/login", { replace: true });
  },

  getUsers: async (): Promise<void> => {
    try {
      const data = (await getUsers()) as User[];
      set({ users: data });
    } catch (err) {
      console.log(err);
    }
  },

  addUser: async (userData: User): Promise<boolean | undefined> => {
    try {
      const data = (await addUser(userData)) as User;
      set((state) => ({ users: [...state.users, data] }));
      return true;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  deleteUser: async (id: string): Promise<boolean | undefined> => {
    try {
      const data = (await deleteUser(id)) as User;
      set((state) => ({
        users: state.users.filter((user) => user._id !== data._id),
      }));
      return true;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  editUser: async (user: User): Promise<boolean | undefined> => {
    try {
      const data = (await editUser(user)) as User;
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
