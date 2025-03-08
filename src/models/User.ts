export type User = {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  type: "utilisateur" | "admin";
  shop?: string;
  shopId?: string;
};
