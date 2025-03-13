import { AccountType, MoveType } from "../constants";

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
  lastMove: { type: "entrée", amount: 0 },
  rate: "1",
  shop: "",
  shopId: "",
  type: "primary",
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
