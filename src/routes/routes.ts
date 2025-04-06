import { Route } from "../models/Route";

export const ADMIN_ROUTES: Route[] = [
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

export const USER_ROUTES: Route[] = [
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
