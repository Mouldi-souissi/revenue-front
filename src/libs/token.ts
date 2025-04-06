import decode, { JwtPayload } from "jwt-decode";

export const decodeToken = <T = JwtPayload>(token: string | null): T | null => {
  if (!token) return null;
  try {
    return decode<T>(token);
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
