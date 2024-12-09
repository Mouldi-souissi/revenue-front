import { ICON_COLORS } from "../constants";

export const getIconColor = (name) => {
  const color = ICON_COLORS[name];

  if (!color) return "white";
  return color;
};
