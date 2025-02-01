export const getHeaders = () => {
  const token = sessionStorage.getItem("token") || null;

  if (!token) return null;

  return { headers: { Authorization: `Bearer ${token}` } };
};
