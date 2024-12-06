export const API_URL = "https://revenue-api.vercel.app/api";
// export const API_URL = "http://localhost:5000/api";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "utilisateur",
};

export const ADMIN_ROUTES = [
  { link: "/", text: "Tableau de bord" },
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
  {
    link: "/revenue",
    text: "Recette",
  },
  {
    link: "/history",
    text: "Historique",
  },
];

export const USER_ROUTES = [
  { link: "/", text: "Tableau de bordd" },
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
  {
    link: "/revenue",
    text: "Recette",
  },
];

export const MOVE_SUBTYPES = {
  sale: "vente",
  win: "gain",
  spending: "dépense",
  deposit: "versement",
  withdraw: "retrait",
};

export const MOVE_TYPES = {
  in: "entrée",
  out: "sortie",
};
