import React, { useRef } from "react";
import useStore from "../../../store";

const DeleteWin = ({ winDoc }) => {
  const deleteMove = useStore((state) => state.deleteMove);
  const refClose = useRef();

  const handleDelete = () => {
    deleteMove(winDoc._id);
    refClose.current.click();
  };
  return (
    <div class="modal fade" id="deleteWin" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5"></h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Veillez confirmer la supression</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button
              type="button"
              class="btn btn-primary"
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

export default DeleteWin;
