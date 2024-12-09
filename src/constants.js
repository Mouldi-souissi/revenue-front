export const API_URL = "https://revenue-api.vercel.app/api";
// export const API_URL = "http://localhost:5000/api";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "utilisateur",
};

export const ADMIN_ROUTES = [
  { link: "/", text: "Tableau de bord", icon: "dashboard" },
  { link: "/users", text: "Utilisateurs", icon: "users" },
  {
    link: "/accounts",
    text: "Comptes",
    icon: "accounts",
  },
  {
    link: "/sales",
    text: "Ventes",
    icon: "vente",
  },
  {
    link: "/spending",
    text: "Dépenses",
    icon: "dépense",
  },
  {
    link: "/wins",
    text: "Gain",
    icon: "gain",
  },
  {
    link: "/revenue",
    text: "Recette",
    icon: "revenue",
  },
  {
    link: "/history",
    text: "Historique",
    icon: "history",
  },
];

export const USER_ROUTES = [
  { link: "/", text: "Tableau de bord", icon: "dashboard" },
  {
    link: "/sales",
    text: "Ventes",
    icon: "vente",
  },
  {
    link: "/spending",
    text: "Dépenses",
    icon: "dépense",
  },
  {
    link: "/wins",
    text: "Gain",
    icon: "gain",
  },
  {
    link: "/revenue",
    text: "Recette",
    icon: "revenue",
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

export const PERIOD_VALUES = {
  daily: "daily",
  yesterday: "yesterday",
  weekly: "weekly",
  monthly: "monthly",
};

export const ACCOUNT_TYPES = {
  primary: "primary",
  secondary: "secondary",
};

export const ICON_COLORS = {
  vente: "yellowgreen",
  gain: "yellow",
  dépense: "red",
  versement: "green",
  retrait: "orange",
  revenue: "cyan",
  sidebar: "white",
};
