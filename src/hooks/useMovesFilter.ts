import { useState } from "react";
import { Move } from "../models/Move";

export const useMovesFilter = (moves: Move[]) => {
  const [userFilter, setUserFilter] = useState<string>("all");

  let filteredMoves: Move[] = [];

  if (userFilter === "all") {
    filteredMoves = moves;
  } else {
    filteredMoves = moves.filter((m) => m.user === userFilter);
  }

  return { filteredMoves, userFilter, setUserFilter };
};
