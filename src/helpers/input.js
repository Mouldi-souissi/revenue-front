export const formatInput = (value) => {
  if (Number(value) > 0) {
    return Number(value);
  } else {
    return "";
  }
};
