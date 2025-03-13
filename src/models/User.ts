import { UserRole } from "../constants";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  type: UserRole;
  shop: string;
  shopId: string;
};

export type UserPayload = {
  name: string;
  email: string;
  type: UserRole;
  password: string;
};

export type UserEditPayload = {
  name: string;
  type: UserRole;
};
