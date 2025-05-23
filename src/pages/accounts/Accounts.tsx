import { useEffect, useState } from "react";
import store_account from "../../stores/store_account";
import AddAccount from "./AddAccount";
import DeleteAccount from "./DeleteAccount";
import EditAccount from "./EditAccount";
import Wrapper from "../../components/layout/Wrapper";
import { toTunisTime } from "../../helpers/timeAndDate";
import { formatNumber } from "../../helpers/currency";
import { ACCOUNT_TYPES } from "../../constants";
import { defaultAccount } from "../../models/Account";

const Sites = () => {
  const [account, setAccount] = useState(defaultAccount);
  const [isLoading, setLoading] = useState(false);

  const accounts = store_account((state) => state.accounts);
  const getAccounts = store_account((state) => state.getAccounts);

  const init = () => {
    setLoading(true);
    getAccounts().finally(() => setLoading(false));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <div className="d-flex align-items-center justify-content-between gap-2 p-3">
        <div className="d-flex gap-2 align-items-center">
          <button
            className="button transparent"
            onClick={init}
            disabled={isLoading}
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <div className="title">Comptes</div>
          {isLoading && <div className="loader"></div>}
        </div>

        <button
          data-bs-toggle="modal"
          data-bs-target="#addSite"
          className="secondary"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table>
          <thead>
            <tr>
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
                  <td>{account.name}</td>
                  <td>{account.rate}</td>
                  <td>
                    <div className="d-flex align-items-baseline gap-1">
                      <div>{formatNumber(account.deposit)}</div>
                      <div className="small">TND</div>
                    </div>
                  </td>
                  <td>{toTunisTime(account.lastUpdated)}</td>
                  <td>
                    {account.type !== ACCOUNT_TYPES.primary && (
                      <button
                        className="smallBtn me-1"
                        data-bs-toggle="modal"
                        data-bs-target="#editAccount"
                        onClick={() => setAccount(account)}
                      >
                        <i className="fa-solid fa-gear"></i>
                      </button>
                    )}
                    {account.type !== ACCOUNT_TYPES.primary && (
                      <button
                        className="smallBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteAccount"
                        onClick={() => setAccount(account)}
                      >
                        <i className="fa-solid fa-trash text-danger"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            {!accounts.length && (
              <tr>
                <td colSpan={5} className="text-center">
                  pas de donnée
                </td>
              </tr>
            )}
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
