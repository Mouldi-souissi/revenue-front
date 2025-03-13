import { MoveSubType } from "../constants";

export type Account = {
  name: string;
  deposit: number;
};

export type History = {
  date: Date | string;
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
