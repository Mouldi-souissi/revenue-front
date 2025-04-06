import { MoveType, MoveSubType, MOVE_TYPES, MOVE_SUBTYPES } from "../constants";

export type Move = {
  _id: string;
  type: MoveType;
  subType: MoveSubType;
  amount: number;
  account: string;
  description?: string;
  user: string;
  date: string;
  shop: string;
  shopId: string;
  userId: string;
  accountId: string;
};

export type MovePayload = {
  type: MoveType;
  subType: MoveSubType;
  amount: number;
  account: string;
  description?: string;
  accountId: string;
};

export const defaultMove: Move = {
  type: MOVE_TYPES.in,
  amount: 0,
  subType: MOVE_SUBTYPES.deposit,
  account: "",
  user: "",
  shopId: "",
  _id: "",
  date: "",
  shop: "",
  userId: "",
  accountId: "",
  description: "",
};

export type Revenue = {
  totalSales: number;
  totalWins: number;
  totalSpending: number;
  revenue: number;
};
