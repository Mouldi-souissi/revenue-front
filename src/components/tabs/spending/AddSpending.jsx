import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddSpending = ({ spendingDoc }) => {
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
  }, [spendingDoc]);

  return (
    <div
      class="modal fade"
      id="addSpending"
      tabindex="-1"
      aria-labelledby="addSpendingLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" onSubmit={handleSubmit}>
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addSpendingLabel">
              Ajouter une dépense
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Description"
                name="description"
                onChange={handleInput}
              />
              <label>Description</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
              />
              <label>Montant</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button type="submit" class="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpending;
