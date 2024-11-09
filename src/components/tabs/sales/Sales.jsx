import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import AddSale from "./AddSale";
import DeleteMove from "../../DeleteMove";

const Sales = () => {
  const [sale, setSale] = useState("");
  const sales = useStore((state) => state.sales);
  const getSales = useStore((state) => state.getSales);
  const getAccounts = useStore((state) => state.getAccounts);
  const isLoading = useStore((state) => state.isLoading);

  const spending = useStore((state) => state.spending);
  const getSpending = useStore((state) => state.getSpending);
  const wins = useStore((state) => state.wins);
  const getWins = useStore((state) => state.getWins);

  const totalSpending = spending.reduce(
    (acc, curr) => (acc += Number(curr.amount)),
    0,
  );
  const totalWins = wins.reduce((acc, curr) => (acc += Number(curr.amount)), 0);
  const total = sales.reduce((acc, curr) => (acc += Number(curr.amount)), 0);
  const totalNetSales = total - totalWins - totalSpending;

  useEffect(() => {
    getSales();
    getAccounts();
    getSpending();
    getWins();
  }, []);

  const username = useStore((state) => state.username);
  const userType = useStore((state) => state.userType);

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
    <div className="container">
      <div className="loader_wrapper">
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center ">
            <div className="loader"></div>
          </div>
        )}
      </div>

      <div className="tableCard d-flex align-items-start justify-content-between gap-2 p-3">
        <div className="">
          <div className="title">Ventes</div>
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
    </div>
  );
};

export default Sales;
