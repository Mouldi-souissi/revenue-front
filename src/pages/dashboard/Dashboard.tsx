import { ChangeEvent, useEffect, useState } from "react";
import DeleteMove from "../shared/DeleteMove";
import Pagination from "../../components/UI/Pagination";
import AddAmount from "./AddAmount";
import WithDraw from "./WithDraw";
import store_user from "../../stores/store_user";
import Wrapper from "../../components/layout/Wrapper";
import store_account from "../../stores/store_account";
import store_move from "../../stores/store_move";
import { toTunisTime, compareDates } from "../../helpers/timeAndDate";
import { usePagination } from "../../hooks/usePagination";
import { useMovesFilter } from "../../hooks/useMovesFilter";
import RevenueCards from "../shared/RevenueCards";
import { formatNumber, formatCurrency } from "../../helpers/currency";
import {
  MOVE_SUBTYPES,
  PERIOD_VALUES,
  ACCOUNT_TYPES,
  USER_ROLES,
  Period,
} from "../../constants";
import IconSVG from "../../components/UI/IconSVG";
import { getIconColor } from "../../helpers/getIconColor";
import { exportToCSV } from "../../helpers/exportCSV";
import Reset from "./Reset";
import { defaultMove, Move } from "../../models/Move";

const calulateRevenue = (moves: Move[], userFilter: string) => {
  let revenue = 0;
  let wins = 0;
  let spending = 0;
  let sales = 0;

  for (const move of moves) {
    if (move.subType === MOVE_SUBTYPES.win) {
      if (userFilter === "all" || userFilter === move.user) {
        wins += Number(move.amount);
      }
    }
    if (move.subType === MOVE_SUBTYPES.spending) {
      if (userFilter === "all" || userFilter === move.user) {
        spending += Number(move.amount);
      }
    }

    if (move.subType === MOVE_SUBTYPES.sale) {
      if (userFilter === "all" || userFilter === move.user) {
        sales += Number(move.amount);
      }
    }
  }

  revenue = sales - wins - spending;

  return { revenue, wins, spending, sales };
};

const periodOptions = [
  { text: "Aujourd'hui", value: PERIOD_VALUES.daily },
  { text: "Hier", value: PERIOD_VALUES.yesterday },
  { text: "Cette semaine", value: PERIOD_VALUES.weekly },
  { text: "Ce mois", value: PERIOD_VALUES.monthly },
];

const Dashboard = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [period, setPeriod] = useState<Period>(PERIOD_VALUES.daily);

  const [move, setMove] = useState<Move>(defaultMove);

  const getMoves = store_move((state) => state.getMoves);
  const moves = store_move((state) => state.moves).sort((a, b) =>
    compareDates(a.date, b.date),
  );
  // const reset = store_move((state) => state.reset);

  const selectAccount = store_account((state) => state.selectAccount);
  const getAccounts = store_account((state) => state.getAccounts);
  const accounts = store_account((state) => state.accounts);

  const role = store_user((state) => state.role);
  const getUsers = store_user((state) => state.getUsers);
  const users = store_user((state) => state.users);

  // filter hook
  const { filteredMoves, userFilter, setUserFilter } = useMovesFilter(moves);
  // pagination hook
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    onPageChange,
  } = usePagination();

  const paginatedMoves = filteredMoves.slice(startIndex, endIndex);

  const init = () => {
    setLoading(true);
    getMoves(period).finally(() => setLoading(false));
    getAccounts();
    getUsers();
    setCurrentPage(1);
    setUserFilter("all");
  };

  useEffect(() => {
    init();
  }, [role]);

  const handlePeriod = async (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const selected = e.target.value as Period;
      setPeriod(selected);
      setLoading(true);
      await getMoves(selected);
      setCurrentPage(1);
      setUserFilter("all");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserFilter(e.target.value);
    setCurrentPage(1);
  };

  const { revenue, wins, spending, sales } = calulateRevenue(
    filteredMoves,
    userFilter,
  );

  const handleExport = () => {
    let data = [];

    for (const row of filteredMoves) {
      const formated = {
        Compte: row.account,
        Type: row.type,
        Catégorie: row.subType,
        Montant: row.amount,
        Utilisateur: row.user,
        Date: row.date && toTunisTime(row.date),
      };

      data.push(formated);
    }

    const filename = `Les opérations - ${toTunisTime(new Date().toISOString())}`;

    exportToCSV(data, filename);
  };

  return (
    <Wrapper>
      {/*      {role === USER_ROLES.ADMIN && (
        <div className="d-flex justify-content-end mb-3">
          <button
            className="text-danger transparent"
            data-bs-toggle="modal"
            data-bs-target="#reset"
          >
            <i className="fa-solid fa-power-off me-2"></i>
            <span className="small">Réinitialiser le système</span>
          </button>
        </div>
      )}*/}

      <div className="dashboard_cards mb-4">
        {accounts.map((account) => (
          <div className="dashboard_card" key={account._id}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="card_title">{account.name}</div>
              {role === USER_ROLES.ADMIN && (
                <div className="d-flex gap-2">
                  {account.type === ACCOUNT_TYPES.primary && (
                    <button
                      className="secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#withdraw"
                      onClick={() => selectAccount(account)}
                    >
                      <i className="fa-solid fa-minus" />
                    </button>
                  )}
                  <button
                    className="secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#addAmount"
                    onClick={() => selectAccount(account)}
                  >
                    <i className="fa-solid fa-plus" />
                  </button>
                </div>
              )}
            </div>
            <div className="d-flex align-items-start justify-content-center flex-column mt-2">
              <div className="d-flex align-items-baseline gap-2">
                <div className="card_value">
                  {formatNumber(account.deposit)}
                </div>
                <div>TND</div>
              </div>

              <div className="d-flex align-items-center gap-3 mt-2">
                <div className=" small">Dernière opération : </div>
                <div
                  className={`small ${
                    account.lastMove?.type === "sortie" ? "red" : "green"
                  }`}
                >
                  {account.lastMove?.type === "entrée" && "+"}
                  {account.lastMove?.type === "sortie" && "-"}
                  {account.lastMove?.amount &&
                    formatCurrency(account.lastMove.amount)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3">
        <div className="d-flex gap-2 align-items-center justify-content-center mb-2">
          <button
            className="button transparent"
            onClick={init}
            disabled={isLoading}
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <div className="title text-center">Les opérations</div>
          {isLoading && <div className="loader"></div>}
        </div>
        <div className="d-flex justify-content-center mb-4">
          <button
            className="button transparent"
            onClick={handleExport}
            disabled={isLoading || !filteredMoves.length}
          >
            <i className="fa-solid fa-file-arrow-down me-2"></i>
            <span className="small">Télécharger</span>
          </button>
        </div>

        <div className="row g-3 mx-lg-5 mx-sm-none">
          <div className="col-lg-6">
            <div className="input-group w-100">
              <span className="input-group-text" style={{ width: "30%" }}>
                Période
              </span>
              <select
                className="form-select"
                value={period}
                onChange={handlePeriod}
                id="period"
                name="period"
              >
                {periodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-group w-100">
              <span className="input-group-text" style={{ width: "30%" }}>
                Utilisateur
              </span>

              <select
                className="form-select"
                value={userFilter}
                onChange={handleFilter}
                id="user"
                name="user"
              >
                <option value="all">Tous</option>
                {users.map((user) => (
                  <option value={user.name} key={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <RevenueCards
          sales={sales}
          wins={wins}
          spending={spending}
          revenue={revenue}
        />
      </div>
      <div className="table-responsive my-5">
        <table>
          <thead>
            <tr>
              <th scope="col">Compte</th>
              <th scope="col">Type</th>
              <th scope="col">Catégorie</th>
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Date</th>
              <th scope="col">Description</th>

              {role === USER_ROLES.ADMIN && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedMoves.map((move) => (
              <tr key={move._id}>
                <td>{move.account}</td>
                <td>{move.type}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <IconSVG
                      name={move.subType}
                      size={20}
                      color={getIconColor(move.subType)}
                    />

                    <div>{move.subType}</div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-baseline gap-1">
                    <div>{formatNumber(move.amount)}</div>
                    <div className="small">TND</div>
                  </div>
                </td>
                <td>{move.user}</td>
                <td className="date">{move.date && toTunisTime(move.date)}</td>
                <td>{move.description}</td>

                {role === USER_ROLES.ADMIN && (
                  <td>
                    <button
                      className="smallBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteMove"
                      onClick={() => setMove(move)}
                    >
                      <i className="fa-solid fa-trash  text-danger"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {!paginatedMoves.length && (
              <tr>
                <td colSpan={8} className="text-center">
                  pas de donnée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center justify-content-center my-3">
        <Pagination
          totalItems={filteredMoves.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>

      <DeleteMove move={move} />
      <AddAmount />
      <WithDraw />
      <Reset />
    </Wrapper>
  );
};

export default Dashboard;
