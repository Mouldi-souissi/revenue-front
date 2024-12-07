import { MOVE_TYPES, MOVE_SUBTYPES } from "../constants";

class MoveValidator {
  constructor(
    type = "",
    subType = "",
    amount = "",
    account = "",
    accountId = "",
    description = "",
  ) {
    this.type = type;
    this.subType = subType;
    this.amount = amount;
    this.account = account;
    this.accountId = accountId;
    this.description = description;
  }

  isValid() {
    let isValid = true;
    let error = "";

    if (!this.type) {
      error = "type is required";
      isValid = false;
      return;
    }

    if (!this.subType) {
      error = "subType is required";
      isValid = false;
      return;
    }

    if (!this.amount) {
      error = "amount is required";
      isValid = false;
      return;
    }

    if (!this.account) {
      error = "account is required";
      isValid = false;
      return;
    }

    if (!this.accountId) {
      error = "accountId is required";
      isValid = false;
      return;
    }

    if (this.amount < 0) {
      error = "move is negatif";
      isValid = false;
      return;
    }

    if (!Object.values(MOVE_TYPES).includes(this.type)) {
      error = "invalid type";
      isValid = false;
      return;
    }

    if (!Object.values(MOVE_SUBTYPES).includes(this.subType)) {
      error = "invalid subType";
      isValid = false;
      return;
    }

    return { isValid, error };
  }

  reset() {
    this.type = "";
    this.subType = "";
    this.amount = "";
    this.account = "";
    this.accountId = "";
    this.description = "";
  }
}

export default MoveValidator;
