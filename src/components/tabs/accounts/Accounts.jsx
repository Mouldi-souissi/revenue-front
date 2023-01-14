import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import AddAccount from "./AddAccount";
import DeleteAccount from "./DeleteAccount";
import EditAccount from "./EditAccount";

const Sites = () => {
  const [account, setAccount] = useState("");
  const accounts = useStore((state) => state.accounts);
  const getAccounts = useStore((state) => state.getAccounts);
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <h3 className="m-0 me-3">Comptes</h3>
        <i
          className="fa-solid fa-plus btn btn-outline-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addSite"
        ></i>
      </div>
      <div className="loader_wrapper">
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center ">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Logo</th>
              <th scope="col">Nom</th>
              <th scope="col">Taux</th>
              <th scope="col">Solde</th>
              <th scope="col">Modifié le</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts
              .sort((a, b) => {
                if (a._id < b._id) return 1;
                if (a._id > b._id) return -1;
                return 0;
              })
              .map((account) => (
                <tr key={account._id}>
                  <td>
                    <img className="img-fluid logo" src={account.img} />
                  </td>
                  <td>{account.name}</td>
                  <td>{account.rate}</td>
                  <td>
                    {Number(account.deposit).toLocaleString("fr", {
                      style: "currency",
                      currency: "TND",
                      minimumFractionDigits: 0,
                    })}
                  </td>
                  <td>
                    {account.lastUpdated
                      ? new Date(account.lastUpdated).toLocaleString("fr", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "-"}
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-gear btn"
                      data-bs-toggle="modal"
                      data-bs-target="#editAccount"
                      onClick={() => setAccount(account)}
                    ></i>
                    {account.name !== "Fond" && (
                      <i
                        className="fa-solid fa-trash btn text-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteAccount"
                        onClick={() => setAccount(account)}
                      ></i>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddAccount />
      <DeleteAccount account={account} />
      <EditAccount account={account} />
    </div>
  );
};

export default Sites;
