import React, { useEffect, useState } from "react";
import useStore from "../../store";
import AddAccount from "./AddAccount";
import DeleteAccount from "./DeleteAccount";
import EditAccount from "./EditAccount";
import Wrapper from "../../components/Wrapper";

const Sites = () => {
  const [account, setAccount] = useState("");
  const accounts = useStore((state) => state.accounts);
  const getAccounts = useStore((state) => state.getAccounts);
  const isLoading = useStore((state) => state.isLoading);

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Wrapper className="container">
      <div className="d-flex align-items-center justify-content-between gap-2 p-3">
        <div className="d-flex gap-5 align-items-center">
          <div className="title">Comptes</div>
          {isLoading && <div className="loader"></div>}
        </div>

        {/*       <button
          data-bs-toggle="modal"
          data-bs-target="#addSite"
          className="button primary sm"
        >
          <i className="fa-solid fa-plus"></i>
        </button>*/}
      </div>
      <div className="table-responsive mt-3">
        <table>
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Taux</th>
              <th scope="col">Solde</th>
              <th scope="col">Modifié le</th>
              {/* <th scope="col">Actions</th> */}
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
                  {/* <td>
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
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddAccount />
      <DeleteAccount account={account} />
      <EditAccount account={account} />
    </Wrapper>
  );
};

export default Sites;
