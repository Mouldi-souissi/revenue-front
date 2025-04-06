import { MOVE_TYPES, MOVE_SUBTYPES, MoveSubType, MoveType } from "../constants";
import { MovePayload } from "../models/Move";

class MoveBuilder {
  type: string;
  subType: string;
  amount: number | string;
  account: string;
  accountId: string;
  description: string;

  constructor(
    type: string = "",
    subType: string = "",
    amount: number | string = "",
    account: string = "",
    accountId: string = "",
    description: string = "",
  ) {
    this.type = type;
    this.subType = subType;
    this.amount = amount;
    this.account = account;
    this.accountId = accountId;
    this.description = description;
  }

  isValid(): { isValid: boolean; error: string } {
    const isValid = true;
    const error = "";

    if (!this.type) return { isValid: false, error: "type is required" };
    if (!this.subType) return { isValid: false, error: "subType is required" };
    if (!this.amount) return { isValid: false, error: "amount is required" };
    if (!this.account) return { isValid: false, error: "account is required" };
    if (!this.accountId)
      return { isValid: false, error: "accountId is required" };

    if (typeof this.amount === "number" && this.amount < 0) {
      return { isValid: false, error: "move is negative" };
    }

    if (!Object.values(MOVE_TYPES).includes(this.type as MoveType)) {
      return { isValid: false, error: "invalid type" };
    }

    if (!Object.values(MOVE_SUBTYPES).includes(this.subType as MoveSubType)) {
      return { isValid: false, error: "invalid subType" };
    }

    return { isValid, error };
  }

  getMove() {
    return {
      type: this.type,
      subType: this.subType,
      amount: this.amount,
      account: this.account,
      accountId: this.accountId,
      description: this.description,
    } as MovePayload;
  }

  reset(): void {
    this.type = "";
    this.subType = "";
    this.amount = "";
    this.account = "";
    this.accountId = "";
    this.description = "";
  }
}

export default MoveBuilder;
