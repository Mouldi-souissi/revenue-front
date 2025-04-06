export const USER_ROLES = {
  ADMIN: "admin",
  USER: "utilisateur",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const MOVE_SUBTYPES = {
  sale: "vente",
  win: "gain",
  spending: "dépense",
  deposit: "versement",
  withdraw: "retrait",
  all: "all",
} as const;

export type MoveSubType = (typeof MOVE_SUBTYPES)[keyof typeof MOVE_SUBTYPES];

export const MOVE_TYPES = {
  in: "entrée",
  out: "sortie",
} as const;

export type MoveType = (typeof MOVE_TYPES)[keyof typeof MOVE_TYPES];

export const PERIOD_VALUES = {
  daily: "daily",
  yesterday: "yesterday",
  weekly: "weekly",
  monthly: "monthly",
} as const;

export type Period = (typeof PERIOD_VALUES)[keyof typeof PERIOD_VALUES];

export const ACCOUNT_TYPES = {
  primary: "primary",
  secondary: "secondary",
} as const;

export type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES];

export const ICON_COLORS = {
  vente: "yellowgreen",
  gain: "gold",
  dépense: "red",
  versement: "green",
  retrait: "orange",
  revenue: "cyan",
  sidebar: "white",
} as const;

export type IconColor = (typeof ICON_COLORS)[keyof typeof ICON_COLORS];
