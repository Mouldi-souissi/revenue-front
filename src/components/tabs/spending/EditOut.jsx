import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const EditOut = ({ spendingDoc }) => {
  const [data, setData] = useState("");
  const editMove = useStore((state) => state.editMove);
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
    setData(spendingDoc);
  }, [spendingDoc]);
  return (
    <div
      class="modal fade"
      id="editOut"
      tabindex="-1"
      aria-labelledby="editOutLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" onSubmit={handleSubmit}>
          <div class="modal-header">
            <h1 class="modal-title fs-5">Editer</h1>
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
                value={data.description}
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
                value={data.amount}
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
              Sauvgarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOut;
