import { useEffect, useState } from "react";
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
import { MOVE_SUBTYPES, PERIOD_VALUES } from "../../constants";

const handleSubtypeIcon = (subtype) => {
  const icons = {
    vente: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-arrow-up"
        color="yellowgreen"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m16 12-4-4-4 4" />
        <path d="M12 16V8" />
      </svg>
    ),
    gain: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-coins"
        color="yellow"
      >
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
        <path d="m16.71 13.88.7.71-2.82 2.82" />
      </svg>
    ),
    dépense: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-arrow-down"
        color="red"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8" />
        <path d="m8 12 4 4 4-4" />
      </svg>
    ),
    versement: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-plus"
        color="green"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    ),
    retrait: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-minus"
        color="orange"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
      </svg>
    ),
  };

  const icon = icons[subtype];

  if (icon) {
    return icon;
  }

  return "";
};

const calulateRevenue = (moves, userFilter) => {
  let revenue = 0;
  let wins = 0;
  let spending = 0;
  let sales = 0;

  for (let move of moves) {
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
  const [isLoading, setLoading] = useState(false);
  const [period, setPeriod] = useState("daily");

  const [move, setMove] = useState("");

  const getMoves = store_move((state) => state.getMoves);
  const moves = store_move((state) => state.moves).sort((a, b) =>
    compareDates(a.date, b.date),
  );

  const selectAccount = store_account((state) => state.selectAccount);
  const getAccounts = store_account((state) => state.getAccounts);
  const accounts = store_account((state) => state.accounts);

  const userType = store_user((state) => state.userType);
  const getUsers = store_user((state) => state.getUsers);
  const shop = store_user((state) => state.shop);
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

  let paginatedMoves = filteredMoves.slice(startIndex, endIndex);

  useEffect(() => {
    setLoading(true);
    getMoves().finally(() => setLoading(false));
    getAccounts();
    getUsers();
    setCurrentPage(1);
    setUserFilter("all");
  }, [userType]);

  const handlePeriod = async (e) => {
    try {
      const selected = e.target.value;
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

  const handleFilter = (e) => {
    setUserFilter(e.target.value);
    setCurrentPage(1);
  };

  const { revenue, wins, spending, sales } = calulateRevenue(
    filteredMoves,
    userFilter,
  );

  return (
    <Wrapper>
      <div className="dashboard_cards mb-4">
        {accounts.map((account) => (
          <div className="dashboard_card" key={account._id}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="card_title">{account.name}</div>
              {userType === "admin" && (
                <div className="d-flex gap-2">
                  {account.type === "primary" && (
                    <button
                      className="button primary sm"
                      data-bs-toggle="modal"
                      data-bs-target="#withdraw"
                      onClick={() => selectAccount(account)}
                    >
                      <i className="fa-solid fa-minus" />
                    </button>
                  )}
                  <button
                    className="button primary sm"
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
                    account.lastMove.type === "sortie" ? "red" : "green"
                  }`}
                >
                  {account.lastMove.type === "entrée" && "+"}
                  {account.lastMove.type === "sortie" && "-"}
                  {formatCurrency(account.lastMove.amount)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3">
        <div className="d-flex gap-5 align-items-center justify-content-center mb-4">
          <div className="title text-center">Les opérations</div>
          {isLoading && <div className="loader"></div>}
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
              <th scope="col">Categorie</th>
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Date</th>
              {userType === "admin" && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedMoves.map((move) => (
              <tr key={move._id}>
                <td>{move.account}</td>
                <td>{move.type}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    {handleSubtypeIcon(move.subType)}
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
                <td className="date">{toTunisTime(move.date)}</td>

                <td>
                  {userType === "admin" && (
                    <button
                      className="smallBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteMove"
                      onClick={() => setMove(move)}
                    >
                      <i className="fa-solid fa-trash  text-danger"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {!paginatedMoves.length && (
              <tr>
                <td colSpan="7" className="text-center">
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
    </Wrapper>
  );
};

export default Dashboard;
