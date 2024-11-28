import React, { useRef } from "react";
import useStore from "../../store";

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
        <div className="modal-content p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="modal-title fs-5"></h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={refClose}
            ></button>
          </div>
          <div className="modal-body my-3">
            Veillez confirmer la supression de tout les mouvements
          </div>
          <div className="d-flex justify-content-end align-items-center gap-2">
            <button
              type="button"
              className="button"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button
              type="button"
              className="button primary"
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
