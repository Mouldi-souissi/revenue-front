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
      className="modal fade"
      id="editOut"
      tabIndex="-1"
      aria-labelledby="editOutLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Editer</h1>
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
                value={data.description}
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
                value={data.amount}
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
              Sauvgarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOut;
