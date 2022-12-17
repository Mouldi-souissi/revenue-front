import React, { useRef } from "react";
import useStore from "../../../store";

const DeleteUser = ({ user }) => {
  const deleteUser = useStore((state) => state.deleteUser);
  const refClose = useRef();

  const handleDelete = () => {
    deleteUser(user._id);
    refClose.current.click();
  };

  return (
    <div
      class="modal fade"
      id="deleteUser"
      tabindex="-1"
      aria-labelledby="deleteUserLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteUserLabel"></h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {`Veillez confirmer la supression de l'utilasateur ${user?.name}`}
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

export default DeleteUser;
