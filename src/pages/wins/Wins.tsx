import { useEffect, useState, useRef } from "react";
import DeleteMove from "../shared/DeleteMove";
import AddWin from "./AddWin";
import Wrapper from "../../components/layout/Wrapper";
import store_account from "../../stores/store_account";
import store_user from "../../stores/store_user";
import store_move from "../../stores/store_move";
import { toTunisTime, compareDates } from "../../helpers/timeAndDate";
import { formatNumber } from "../../helpers/currency";
import {
  MOVE_SUBTYPES,
  PERIOD_VALUES,
  USER_ROLES,
  ACCOUNT_TYPES,
} from "../../constants";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../../components/UI/Pagination";
import { Move, defaultMove } from "../../models/Move";

const Wins = () => {
  const [isLoading, setLoading] = useState(false);
  const [winDoc, setWinDoc] = useState<Move>(defaultMove);
  const addWinModal = useRef<HTMLButtonElement>(null);

  const getMoves = store_move((state) => state.getMoves);
  const wins = store_move((state) => state.wins).sort((a, b) =>
    compareDates(a.date, b.date),
  );

  const getAccounts = store_account((state) => state.getAccounts);
  const accounts = store_account((state) => state.accounts);
  const selectAccount = store_account((state) => state.selectAccount);

  const username = store_user((state) => state.username);
  const role = store_user((state) => state.role);

  const total = wins.reduce((acc, curr) => (acc += Number(curr.amount)), 0);

  const init = () => {
    setLoading(true);
    setCurrentPage(1);
    getMoves(PERIOD_VALUES.daily, MOVE_SUBTYPES.win).finally(() =>
      setLoading(false),
    );
    getAccounts();
  };

  useEffect(() => {
    init();
  }, []);

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    onPageChange,
  } = usePagination(10);

  const paginated = wins.slice(startIndex, endIndex);

  const checkUser = (user: string) => {
    if (role === USER_ROLES.ADMIN) {
      return true;
    } else {
      if (username === user) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleAddWinModal = () => {
    const filtered = accounts.filter(
      (acc) => acc.type !== ACCOUNT_TYPES.primary,
    );
    if (filtered.length) {
      selectAccount(filtered[0]);
      addWinModal.current?.click();
    }
  };

  return (
    <Wrapper>
      <div className="d-flex align-items-start justify-content-between gap-2 p-3">
        <div>
          <div className="d-flex gap-2 align-items-center">
            <button
              className="button transparent"
              onClick={init}
              disabled={isLoading}
            >
              <i className="fa-solid fa-rotate-right"></i>
            </button>
            <div className="title">
              Gain <span className="small">(Aujourd'hui)</span>
            </div>
            {isLoading && <div className="loader"></div>}
          </div>
          <div className="mt-3">
            <div className="d-flex gap-2">
              <div>Total:</div>
              <div>
                {total.toLocaleString("fr", {
                  style: "currency",
                  currency: "TND",
                  minimumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>
        </div>
        <button className="secondary" onClick={handleAddWinModal}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table>
          <thead>
            <tr>
              <th scope="col">Compte</th>
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((win) => (
              <tr key={win._id}>
                <td>{win.account}</td>
                <td>
                  <div className="d-flex align-items-baseline gap-1">
                    <div>{formatNumber(win.amount)}</div>
                    <div className="small">TND</div>
                  </div>
                </td>
                <td>{win.user}</td>
                <td>{toTunisTime(win.date)}</td>
                <td>
                  {checkUser(win.user) && (
                    <button
                      className="smallBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteMove"
                      onClick={() => setWinDoc(win)}
                    >
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {!paginated.length && (
              <tr>
                <td colSpan={5} className="text-center">
                  pas de donnée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center justify-content-center my-3">
        <Pagination
          totalItems={wins.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>

      <button
        ref={addWinModal}
        className="d-none"
        data-bs-toggle="modal"
        data-bs-target="#addWin"
      ></button>

      <AddWin />
      <DeleteMove move={winDoc} />
    </Wrapper>
  );
};

export default Wins;
