import { useState } from "react";
// import { useLocation, useSearch } from "wouter";

export const useMovesFilter = (moves) => {
  const [userFilter, setUserFilter] = useState("all");
  const [subTypeFilter, setSubTypeFilter] = useState("all");

  let filteredMoves = [];

  if (userFilter === "all") {
    filteredMoves = moves;
  } else {
    filteredMoves = moves.filter((m) => m.user === userFilter);
  }

  return { filteredMoves, userFilter, setUserFilter };
};
