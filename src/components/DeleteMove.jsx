import React, { useRef, useState } from "react";
import useStore from "../store";

const DeleteMove = ({ move }) => {
  const deleteMove = useStore((state) => state.deleteMove);
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
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5"></h1>
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
