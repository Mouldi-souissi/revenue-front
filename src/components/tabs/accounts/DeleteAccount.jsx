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
    <div class="modal fade" id="deleteAccount">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {`Veillez confirmer la supression du compte ${account?.name}`}
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

export default DeleteAccount;
