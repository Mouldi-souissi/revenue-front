import httpClient from "../libs/httpClient";
import { getHeaders } from "../helpers/getHeaders";
import { Move, Revenue } from "../models/Move";
import { Period, MoveSubType } from "../constants";

const getMoves = async (
  period: Period,
  subType: MoveSubType,
): Promise<Move[]> => {
  return httpClient.get<Move[]>(`/moves/${period}/${subType}`, getHeaders());
};

const addMove = (move: Move): Promise<Move> => {
  return httpClient.post<Move>("/moves", move, getHeaders());
};

const deleteMove = (id: string): Promise<Move> => {
  return httpClient.delete<Move>(`/moves/${id}`, getHeaders());
};

const getRevenue = (
  start: string,
  end: string,
  user: string,
): Promise<Revenue> => {
  return httpClient.get<Revenue>(
    `/moves/revenue/${start}/${end}/${user}`,
    getHeaders(),
  );
};

const getHistory = (start: string, end: string): Promise<Move[]> => {
  return httpClient.get<Move[]>(`/history/${start}/${end}`, getHeaders());
};

const reset = (password: string): Promise<void> => {
  return httpClient.post<void>("/moves/resetShop", { password }, getHeaders());
};

export { getMoves, addMove, deleteMove, getRevenue, getHistory, reset };
