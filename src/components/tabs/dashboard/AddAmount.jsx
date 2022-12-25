import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddAmount = ({ account }) => {
  const [data, setData] = useState("");
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
      type: "entrée",
      subType: "versement",
      account: account.name,
    });
  }, [account]);

  return (
    <div className="modal fade" id="addAmount" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              Alimenter le compte {account.name}
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
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAmount;
