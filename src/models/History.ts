import { MoveSubType } from "../constants";

export type Account = {
  _id: string;
  name: string;
  deposit: number;
};

export type History = {
  _id: string;
  date: string;
  shop: string;
  accountsBefore: Account[];
  accountsAfter: Account[];
  moveSubType: MoveSubType;
  user: string;
  isUndo: boolean;
  amount: number;
  shopId: string;
  userId: string;
};
