export const API_URL = "https://revenue-api.vercel.app/api";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "utilisateur",
};

export const ADMIN_ROUTES = [
  { link: "/dashboard", text: "Tableau de bord" },
  { link: "/users", text: "Utilisateurs" },
  {
    link: "/accounts",
    text: "Comptes",
  },
  {
    link: "/sales",
    text: "Ventes",
  },
  {
    link: "/spending",
    text: "Dépenses",
  },
  {
    link: "/wins",
    text: "Gain",
  },
];

export const USER_ROUTES = [
  { link: "/dashboard", text: "Tableau de bordd" },
  {
    link: "/sales",
    text: "Ventes",
  },
  {
    link: "/spending",
    text: "Dépenses",
  },
  {
    link: "/wins",
    text: "Gain",
  },
];
