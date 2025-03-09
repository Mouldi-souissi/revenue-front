import { MoveType, MoveSubType } from "../constants";

export type Move = {
  _id?: string;
  type: MoveType;
  subType: MoveSubType;
  amount: number;
  account: string;
  description?: string;
  user: string;
  date?: string | Date;
  shop?: string;
  shopId?: string;
  userId?: string;
  accountId?: string;
};

export type Revenue = {
  totalSales: number;
  totalWins: number;
  totalSpending: number;
  revenue: number;
};
