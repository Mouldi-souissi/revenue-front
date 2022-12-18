import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddWin = () => {
  const [data, setData] = useState("");
  const addMove = useStore((state) => state.addMove);
  const accounts = useStore((state) => state.accounts);
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
      type: "sortie",
      subType: "gain",
      account: accounts[0].name,
    });
  }, []);

  return (
    <div class="modal fade" id="addWin" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <form class="modal-content" onSubmit={handleSubmit}>
          <div class="modal-header">
            <h1 class="modal-title fs-5">Ajouter un gain</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div className="form-floating mb-3">
              <select class="form-select" name="account" onChange={handleInput}>
                {accounts.map((account) => (
                  <option key={account._id} value={account.name}>
                    {account.name}
                  </option>
                ))}
              </select>
              <label>Type</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="client/Tél"
                name="description"
                onChange={handleInput}
              />
              <label>client/Tél</label>
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

export default AddWin;
