import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddSpending = () => {
  const [data, setData] = useState({
    type: "sortie",
    subType: "dépense",
    account: "Fond",
    amount: "",
  });
  const [error, setError] = useState("");
  const addMove = useStore((state) => state.addMove);
  const refClose = useRef();

  const handleInput = (e) => {
    let isValid = true;
    if (e.target.name === "amount") {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addMove(data);
    refClose.current.click();
  };

  useEffect(() => {
    setData({
      ...data,
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
                required
                autoComplete="off"
              />
              <label>Description</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
                value={data.amount}
                required
                autoComplete="off"
              />
              <label>Montant</label>
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
            <button type="submit" className="btn btn-secondary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpending;
