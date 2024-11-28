import React, { useRef } from "react";
import useStore from "../../store";

const DeleteUser = ({ user }) => {
  const deleteUser = useStore((state) => state.deleteUser);
  const refClose = useRef();

  const handleDelete = () => {
    deleteUser(user._id);
    refClose.current.click();
  };

  return (
    <div
      className="modal fade"
      id="deleteUser"
      tabIndex="-1"
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
            <div>Veillez confirmer la supression de l'utilasateur :</div>
            <div className="text-black text-center">{user?.name}</div>
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
