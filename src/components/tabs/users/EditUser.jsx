import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const EditUser = ({ user }) => {
  const [data, setData] = useState({ name: "", type: "" });
  const editUser = useStore((state) => state.editUser);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(data);
    refClose.current.click();
  };

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);
  return (
    <div
      className="modal fade"
      id="editUser"
      tabIndex="-1"
      aria-labelledby="editUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content p-3 p-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-black">Editer l'utilisateur</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body my-3 my-3">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nom"
                name="name"
                onChange={handleInput}
                value={data.name}
                required
                autoComplete="off"
              />
              <label>Nom</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="type"
                onChange={handleInput}
                value={data.type}
              >
                <option value="utilisateur">Utilisateur</option>
                <option value="admin">Admin</option>
              </select>
              <label>Type</label>
            </div>
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
            <button type="submit" className="button primary">
              Sauvgarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
