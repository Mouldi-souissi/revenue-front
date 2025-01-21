import { useState } from "react";

export const useMovesFilter = (moves) => {
  const [userFilter, setUserFilter] = useState("all");

  let filteredMoves = [];

  if (userFilter === "all") {
    filteredMoves = moves;
  } else {
    filteredMoves = moves.filter((m) => m.user === userFilter);
  }

  return { filteredMoves, userFilter, setUserFilter };
};
