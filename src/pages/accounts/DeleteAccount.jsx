import { useRef } from "react";
import store_account from "../../stores/store_account";

const DeleteAccount = ({ account }) => {
  const deleteAccount = store_account((state) => state.deleteAccount);
  const refClose = useRef();

  const handleDelete = () => {
    deleteAccount(account._id);
    refClose.current.click();
  };

  return (
    <div className="modal fade" id="deleteAccount">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body my-3">
            {`Veuillez confirmer la suppression du compte ${account?.name}`}
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

export default DeleteAccount;
