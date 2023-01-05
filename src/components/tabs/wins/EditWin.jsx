import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const EditWin = ({ winDoc }) => {
  const [data, setData] = useState("");
  const editMove = useStore((state) => state.editMove);
  const accounts = useStore((state) => state.accounts);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editMove(data);
    refClose.current.click();
  };

  useEffect(() => {
    setData(winDoc);
  }, [winDoc]);

  return (
    <div className="modal fade" id="editWin" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Ajouter un gain</h1>
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
                value={data.account}
              >
                {accounts.map((account) => (
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
                placeholder="client/Tél"
                name="description"
                onChange={handleInput}
                value={data.description}
              />
              <label>client/Tél</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
                value={data.amount}
              />
              <label>Montant</label>
            </div>
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
            <button type="submit" className="btn btn-secondary">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWin;
