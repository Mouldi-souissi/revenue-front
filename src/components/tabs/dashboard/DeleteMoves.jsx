import React, { useRef } from "react";
import useStore from "../../../store";

const DeleteMoves = () => {
  const deleteAllMoves = useStore((state) => state.deleteAllMoves);
  const refClose = useRef();

  const handleDelete = () => {
    deleteAllMoves();
    refClose.current.click();
  };
  return (
    <div
      className="modal fade"
      id="deleteAllMoves"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5"></h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={refClose}
            ></button>
          </div>
          <div className="modal-body">
            Veillez confirmer la supression de tout les mouvements
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
            <button
              type="button"
              className="btn btn-secondary"
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

export default DeleteMoves;
