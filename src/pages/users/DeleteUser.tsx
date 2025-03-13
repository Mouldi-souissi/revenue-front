import { useRef } from "react";
import store_user from "../../stores/store_user";
import { Notyf } from "notyf";
import { User } from "../../models/User";

type props = {
  user: User;
};

const notyf = new Notyf();

const DeleteUser = ({ user }: props) => {
  const deleteUser = store_user((state) => state.deleteUser);
  const refClose = useRef<HTMLButtonElement>(null);

  const handleDelete = async () => {
    try {
      const success = await deleteUser(user._id as string);

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
    <div
      className="modal fade"
      id="deleteUser"
      tabIndex={-1}
      aria-labelledby="deleteUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3 p-2">
          <div className="d-flex justify-content-end align-items-center">
            <h1 className="modal-title fs-5" id="deleteUserLabel"></h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body my-3 my-3">
            <div>Veuillez confirmer la suppression de l'utilasateur :</div>
            <div className="text-black text-center">{user.name}</div>
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

export default DeleteUser;
