import storage from "../libs/storage";

export const getHeaders = () => {
  const token = storage.getItem("token");

  if (!token) return {};

  return { headers: { Authorization: `Bearer ${token}` } };
};
