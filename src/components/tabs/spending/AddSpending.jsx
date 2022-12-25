import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddSpending = () => {
  const [data, setData] = useState({ type: "sortie" });
  const addMove = useStore((state) => state.addMove);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMove(data);
    refClose.current.click();
  };

  useEffect(() => {
    setData({
      ...data,
      subType: "dépense",
      account: "Caisse",
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="addSpending"
      tabIndex="-1"
      aria-labelledby="addSpendingLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addSpendingLabel">
              Ajouter une dépense
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                onChange={handleInput}
              />
              <label>Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
              />
              <label>Montant</label>
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

export default AddSpending;
