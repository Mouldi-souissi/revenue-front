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
      className="modal fade"
      id="deleteUser"
      tabIndex="-1"
      aria-labelledby="deleteUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="deleteUserLabel"></h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {`Veillez confirmer la supression de l'utilasateur ${user?.name}`}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={refClose}
            >
              Fermer
            </button>
            <button
              type="button"
              className="btn btn-primary"
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
