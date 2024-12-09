import { useEffect, useState } from "react";
import DeleteMove from "../shared/DeleteMove";
import AddSpending from "./AddSpending";
import Wrapper from "../../components/layout/Wrapper";
import store_user from "../../stores/store_user";
import store_move from "../../stores/store_move";
import { toTunisTime, compareDates } from "../../helpers/timeAndDate";
import { formatNumber } from "../../helpers/currency";
import store_account from "../../stores/store_account";
import { MOVE_SUBTYPES, PERIOD_VALUES, USER_ROLES } from "../../constants";

const Spending = () => {
  const [isLoading, setLoading] = useState(false);
  const [spendingDoc, setSpendingDoc] = useState("");

  const getMoves = store_move((state) => state.getMoves);
  const spending = store_move((state) => state.spending).sort((a, b) =>
    compareDates(a.date, b.date),
  );

  const username = store_user((state) => state.username);
  const userType = store_user((state) => state.userType);

  const getAccounts = store_account((state) => state.getAccounts);
  const accounts = store_account((state) => state.accounts);

  const total = spending.reduce((acc, curr) => (acc += Number(curr.amount)), 0);

  const init = () => {
    setLoading(true);
    getMoves(PERIOD_VALUES.daily, MOVE_SUBTYPES.spending).finally(() =>
      setLoading(false),
    );
    if (!accounts.length) {
      getAccounts();
    }
  };

  useEffect(() => {
    init();
  }, []);

  const checkUser = (user) => {
    if (userType === USER_ROLES.ADMIN) {
      return true;
    } else {
      if (username === user) {
        return true;
      } else {
        return false;
      }
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
              Dépenses <span className="small">(Aujourd'hui)</span>
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
        <button
          data-bs-toggle="modal"
          data-bs-target="#addSpending"
          className="secondary"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table>
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spending.map((spendingDoc) => (
              <tr key={spendingDoc._id}>
                <td>{spendingDoc.description}</td>
                <td>
                  <div className="d-flex align-items-baseline gap-1">
                    <div>{formatNumber(spendingDoc.amount)}</div>
                    <div className="small">TND</div>
                  </div>
                </td>
                <td>{spendingDoc.user}</td>
                <td>{toTunisTime(spendingDoc.date)}</td>
                <td>
                  {checkUser(spendingDoc.user) && (
                    <button
                      className="smallBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteMove"
                      onClick={() => setSpendingDoc(spendingDoc)}
                    >
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {!spending.length && (
              <tr>
                <td colSpan="7" className="text-center">
                  pas de donnée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddSpending />
      <DeleteMove move={spendingDoc} />
    </Wrapper>
  );
};

export default Spending;
