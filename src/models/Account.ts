import { ACCOUNT_TYPES, AccountType, MOVE_TYPES, MoveType } from "../constants";

export type LastMove = {
  type: MoveType;
  amount: number;
};

export type Account = {
  _id: string;
  name: string;
  deposit: number;
  lastUpdated?: string;
  lastMove?: LastMove;
  rate: string;
  shop: string;
  shopId: string;
  type: AccountType;
};

export const defaultAccount: Account = {
  _id: "",
  name: "",
  deposit: 0,
  lastUpdated: "",
  lastMove: { type: MOVE_TYPES.in, amount: 0 },
  rate: "1",
  shop: "",
  shopId: "",
  type: ACCOUNT_TYPES.secondary,
};

export type AccountPayload = {
  name: string;
  deposit: number;
  rate: string;
  type: AccountType;
};

export type AccountEditPayload = {
  name: string;
  rate: string;
};
