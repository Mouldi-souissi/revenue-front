import decode from "jwt-decode";

export const decodeToken = (token) => {
  if (!token) return null;
  try {
    return decode(token);
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
