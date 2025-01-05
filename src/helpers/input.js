export const formatInput = (value) => {
  if (Number(value) > 0) {
    return Number(value);
  } else {
    return "";
  }
};

export const formatFloat = (value) => {
  if (/^\d*\.?\d*$/.test(value)) {
    return value;
  } else {
    return "";
  }
};
