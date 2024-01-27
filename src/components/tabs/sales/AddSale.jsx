import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddSale = () => {
  const [data, setData] = useState({ depositEnd: "" });
  const [error, setError] = useState("");
  const [errorAmount, setErrorAmount] = useState("");
  const addMove = useStore((state) => state.addMove);

  const getTotalWins = useStore((state) => state.getTotalWins);
  const getSpending = useStore((state) => state.getSpending);
  const getAccounts = useStore((state) => state.getAccounts);

  const accounts = useStore((state) => state.accounts);
  const refClose = useRef();
  const [isLoading, setLoading] = useState(false);

  const handleInput = (e) => {
    let isValid = true;
    if (e.target.name === "depositEnd") {
      isValid = validateInput(e);
    }

    if (isValid) {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const validateInput = (event) => {
    if (!/^[0-9]+$/.test(event.target.value)) {
      setError("Seuls les numéros sont autorisés");
      setData({ ...data, [event.target.name]: "" });
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const accounts_res = await getAccounts();
      const account = accounts_res.find((acc) => acc.name === data.account);
      const totalWins = await getTotalWins(account.name);
      const spendings_res = await getSpending();

      const totalSpending = spendings_res.reduce(
        (acc, curr) => (acc += Number(curr.amount)),
        0
      );
      console.log("calc", {
        debut: account.deposit,
        fin: data.depositEnd,
        rate: account.rate,
      });
      const amount =
        (Number(account.deposit) - Number(data.depositEnd)) *
        Number(account.rate);
      const netSale = amount - totalWins - totalSpending;

      console.log("net", netSale);

      if (amount < 0) {
        setErrorAmount(
          "La vente ne peut pas etre negative! veillez entrer les gains d'abord"
        );
      } else {
        setErrorAmount("");
        await addMove({
          amount,
          type: "entrée",
          subType: "vente",
          account: account.name,
          description: netSale,
        });
        refClose.current.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setData({
      ...data,
      account: accounts.filter((account) => account.name !== "Fond")[0]?.name,
    });
  }, [accounts]);

  return (
    <div className="modal fade" id="addSale" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Ajouter une vente</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {errorAmount && (
              <small className="text-danger my-3">{errorAmount}</small>
            )}
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="account"
                onChange={handleInput}
                value={data.account}
              >
                {accounts
                  .filter((account) => account.name !== "Fond")
                  .map((account) => (
                    <option key={account._id} value={account.name}>
                      {account.name}
                    </option>
                  ))}
              </select>
              <label>Type</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="depositEnd"
                onChange={handleInput}
                value={data.depositEnd}
                required
                autoComplete="off"
              />
              <label>Balance {data.account} fin</label>
            </div>
            {!!error.length && (
              <small className="ms-2 text-danger">{error}</small>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSale;
