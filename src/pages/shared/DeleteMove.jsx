import React, { useRef, useState } from "react";
import store_move from "../../stores/store_move";

const DeleteMove = ({ move }) => {
  const deleteMove = store_move((state) => state.deleteMove);
  const refClose = useRef();
  const [isLoading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      if (move._id) {
        setLoading(true);
        await deleteMove(move._id);
        refClose.current.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="modal fade"
      id="deleteMove"
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
            ></button>
          </div>
          <div className="modal-body my-3">Veillez confirmer la supression</div>
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
              disabled={isLoading}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMove;
