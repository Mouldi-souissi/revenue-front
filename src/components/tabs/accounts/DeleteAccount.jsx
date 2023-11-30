import React, { useRef } from "react";
import useStore from "../../../store";

const DeleteAccount = ({ account }) => {
  const deleteAccount = useStore((state) => state.deleteAccount);
  const refClose = useRef();

  const handleDelete = () => {
    deleteAccount(account._id);
    refClose.current.click();
  };
  return (
    <div className="modal fade" id="deleteAccount">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {`Veillez confirmer la supression du compte ${account?.name}`}
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
              disabled={true}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
