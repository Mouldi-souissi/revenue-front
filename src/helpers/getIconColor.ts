import { IconColor, ICON_COLORS, MoveSubType } from "../constants";

export const getIconColor = (name: MoveSubType): IconColor => {
  return ICON_COLORS[name as keyof typeof ICON_COLORS] || "white";
};
