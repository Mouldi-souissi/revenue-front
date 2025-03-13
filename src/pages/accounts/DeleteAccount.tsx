import { useRef } from "react";
import store_account from "../../stores/store_account";
import { Notyf } from "notyf";
import { Account } from "../../models/Account";
const notyf = new Notyf();

type props = {
  account: Account;
};

const DeleteAccount = ({ account }: props) => {
  const deleteAccount = store_account((state) => state.deleteAccount);
  const refClose = useRef<HTMLButtonElement>(null);

  const handleDelete = async () => {
    try {
      const success = await deleteAccount(account._id);
      if (!success) {
        notyf.error("Opération échouée");
      } else {
        notyf.success("Opération réussie");
        refClose.current?.click();
      }
    } catch (err) {
      console.log(err);
    }
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
            {`Veuillez confirmer la suppression du compte ${account.name}`}
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
