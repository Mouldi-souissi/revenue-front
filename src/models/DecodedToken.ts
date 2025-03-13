import { UserRole } from "../constants";

export type DecodedToken = {
  id: string;
  name: string;
  type: UserRole;
  shop: string;
};
