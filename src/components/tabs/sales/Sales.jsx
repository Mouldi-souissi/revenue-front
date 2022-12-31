import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import AddSale from "./AddSale";
import DeleteSale from "./DeleteSale";
import EditSale from "./EditSale";

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
    0
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

  return (
    <div className="container">
      <div className="d-flex align-items-start">
        <div className="me-3">
          <h3 className="m-0">Ventes</h3>
          <h6>
            Total :{" "}
            {total.toLocaleString("fr", {
              style: "currency",
              currency: "TND",
              minimumFractionDigits: 0,
            })}
          </h6>
          <h6>
            Total net :{" "}
            {totalNetSales.toLocaleString("fr", {
              style: "currency",
              currency: "TND",
              minimumFractionDigits: 0,
            })}
          </h6>
        </div>
        <i
          className="fa-solid fa-plus btn btn-outline-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addSale"
        ></i>
      </div>

      {isLoading && (
        <div className="d-flex align-items-center justify-content-center ">
          <div className="loader"></div>
        </div>
      )}
      <div className="table-responsive">
        <table className="table my-5">
          <thead>
            <tr>
              <th scope="col">Compte</th>
              <th scope="col">Montant</th>
              {/* <th scope="col">vente net</th> */}
              <th scope="col">Utilisateur</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.account}</td>
                <td>
                  {Number(sale.amount).toLocaleString("fr", {
                    style: "currency",
                    currency: "TND",
                    minimumFractionDigits: 0,
                  })}
                </td>
                {/* <td>
                  {Number(sale.description).toLocaleString("fr", {
                    style: "currency",
                    currency: "TND",
                    minimumFractionDigits: 0,
                  })}
                </td> */}
                <td>{sale.user}</td>
                <td>
                  {/* <i
                  className="fa-solid fa-gear btn"
                  data-bs-toggle="modal"
                  data-bs-target="#editSale"
                  onClick={() => setSale(sale)}
                ></i> */}
                  <i
                    className="fa-solid fa-trash btn text-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteSale"
                    onClick={() => setSale(sale)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddSale />
      <DeleteSale sale={sale} />
      <EditSale sale={sale} />
    </div>
  );
};

export default Sales;
