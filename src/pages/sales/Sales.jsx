import { useEffect, useState } from "react";
import AddSale from "./AddSale";
import DeleteMove from "../shared/DeleteMove";
import Wrapper from "../../components/Wrapper";
import store_account from "../../stores/store_account";
import store_user from "../../stores/store_user";
import store_move from "../../stores/store_move";

const Sales = () => {
  const [sale, setSale] = useState("");
  const [isLoading, setLoading] = useState(false);

  const sales = store_move((state) => state.sales);
  const getSales = store_move((state) => state.getSales);
  const spending = store_move((state) => state.spending);
  const getSpending = store_move((state) => state.getSpending);
  const totalWins = store_move((state) => state.totalWins);
  const getTotalWins = store_move((state) => state.getTotalWins);

  const getAccounts = store_account((state) => state.getAccounts);

  const username = store_user((state) => state.username);
  const userType = store_user((state) => state.userType);

  const totalSpending = spending.reduce(
    (acc, curr) => (acc += Number(curr.amount)),
    0,
  );
  const total = sales.reduce((acc, curr) => (acc += Number(curr.amount)), 0);
  const totalNetSales = total - totalWins - totalSpending;

  useEffect(() => {
    setLoading(true);
    getSales().finally(() => setLoading(false));

    getAccounts();
    getSpending();
    getTotalWins();
  }, []);

  const checkUser = (user) => {
    if (userType === "admin") {
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
          <div className="d-flex gap-5 align-items-center">
            <div className="title">Ventes</div>
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

            <div className="d-flex gap-2">
              <div>Total net:</div>
              <div>
                {totalNetSales.toLocaleString("fr", {
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
          data-bs-target="#addSale"
          className="button primary sm"
        >
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
            {sales
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((sale) => (
                <tr key={sale._id}>
                  <td>{sale.account}</td>
                  <td>
                    {Number(sale.amount).toLocaleString("fr", {
                      style: "currency",
                      currency: "TND",
                      minimumFractionDigits: 0,
                    })}
                  </td>
                  <td>{sale.user}</td>
                  <td>
                    {new Date(sale.date).toLocaleString("fr", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>
                    {checkUser(sale.user) && (
                      <i
                        className="fa-solid fa-trash btn text-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteMove"
                        onClick={() => setSale(sale)}
                      ></i>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AddSale />
      <DeleteMove move={sale} />
    </Wrapper>
  );
};

export default Sales;
