import { MoveType, MoveSubType } from "../constants";

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
  type: "entrée",
  amount: 0,
  subType: "dépense",
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
