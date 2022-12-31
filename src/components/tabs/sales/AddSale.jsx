import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddSale = () => {
  const [data, setData] = useState("");
  const addMove = useStore((state) => state.addMove);

  const getTotalWins = useStore((state) => state.getTotalWins);
  const getSpending = useStore((state) => state.getSpending);
  const spending = useStore((state) => state.spending);

  const accounts = useStore((state) => state.accounts);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const account = accounts.find((acc) => acc.name === data.account);
    const totalWins = await getTotalWins(account.name).catch((err) =>
      console.log(err)
    );
    await getSpending();
    const totalSpending = spending.reduce(
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
    addMove({
      amount,
      type: "entrée",
      subType: "vente",
      account: account.name,
      description: netSale,
    });
    refClose.current.click();
  };

  useEffect(() => {
    setData({
      ...data,
      account: accounts[0]?.name,
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
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="account"
                onChange={handleInput}
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
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="depositEnd"
                onChange={handleInput}
              />
              <label>Balance {data.account} fin</label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSale;
