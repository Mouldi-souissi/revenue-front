import { UserRole } from "../constants";

export type User = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  type?: UserRole;
  shop?: string;
  shopId?: string;
};
