import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddSale = () => {
  const [data, setData] = useState({
    accounts: [],
  });

  const addSale = useStore((state) => state.addSale);
  const accounts = useStore((state) => state.accounts);
  const refClose = useRef();

  const handleInput = (e, account) => {
    setData({
      ...data,
      accounts: [
        ...data.accounts.filter((acc) => acc.name !== account.name),
        {
          name: account.name,
          depositStart: account.deposit,
          depositEnd: e.target.value,
          rate: account.rate,
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // addMove(data);
    addSale(data);
    refClose.current.click();
  };

  useEffect(() => {
    setData({
      ...data,
      account: accounts[0],
    });
  }, [accounts]);

  const genrateForm = (accounts) => {
    return accounts.map((acc) => (
      <div key={acc._id}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control disabled"
            placeholder={`Balance ${acc.name} debut`}
            defaultValue={acc.deposit}
            readOnly
          />

          <label>{`Balance ${acc.name} debut`}</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={`Balance ${acc.name} fin`}
            name="depositEnd"
            onChange={(e) => handleInput(e, acc)}
          />
          <label>{`Balance ${acc.name} fin`}</label>
        </div>
      </div>
    ));
  };

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
            {genrateForm(accounts.filter((acc) => acc.name !== "Fond"))}
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
