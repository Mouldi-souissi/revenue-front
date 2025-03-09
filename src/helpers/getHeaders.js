export const getHeaders = () => {
  const token = sessionStorage.getItem("token") || null;

  if (!token) return {};

  return { headers: { Authorization: `Bearer ${token}` } };
};
