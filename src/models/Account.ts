import { AccountType, MoveType } from "../constants";

export type LastMove = {
  type: MoveType;
  amount: number;
};

export type Account = {
  _id?: string;
  name: string;
  deposit: number;
  lastUpdated?: string | Date;
  lastMove?: LastMove;
  rate?: number;
  shop?: string;
  shopId?: string;
  type?: AccountType;
};
