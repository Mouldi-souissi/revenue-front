import React, { useRef } from "react";
import useStore from "../../../store";

const DeleteSpending = ({ spendingDoc }) => {
  const deleteMove = useStore((state) => state.deleteMove);
  const refClose = useRef();

  const handleDelete = () => {
    deleteMove(spendingDoc._id);
    refClose.current.click();
  };
  return (
    <div
      className="modal fade"
      id="deleteSpending"
      tabIndex="-1"
      aria-labelledby="deleteSpendingLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="deleteSpendingLabel"></h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Veillez confirmer la supression</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDelete}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSpending;
