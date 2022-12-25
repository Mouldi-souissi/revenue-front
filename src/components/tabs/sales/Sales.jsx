import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import AddSale from "./AddSale";
import DeleteSale from "./DeleteSale";
import EditSale from "./EditSale";

const Sales = () => {
  const [sale, setSale] = useState("");
  const sales = useStore((state) => state.sales);
  const getSales = useStore((state) => state.getSales);
  const accounts = useStore((state) => state.accounts);
  const getAccounts = useStore((state) => state.getAccounts);
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    if (!sales.length) {
      getSales();
    }
    if (!accounts.length) {
      getAccounts();
    }
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <h3 className="m-0 me-3">Ventes</h3>
        <i
          className="fa-solid fa-plus btn btn-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addSale"
        ></i>
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center ms-5">
            <div class="loader"></div>
          </div>
        )}
      </div>
      <div className="table-responsive">
        <table className="table my-5">
          <thead>
            <tr>
              <th scope="col">Compte</th>
              <th scope="col">Montant</th>
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
