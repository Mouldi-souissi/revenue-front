import React, { useRef, useState } from "react";
import useStore from "../../../store";

const AddUser = () => {
  const [data, setData] = useState({ type: "utilisateur" });
  const addUser = useStore((state) => state.addUser);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(data);
    refClose.current.click();
  };
  return (
    <div
      class="modal fade"
      id="addUser"
      tabindex="-1"
      aria-labelledby="addUserLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog ">
        <form onSubmit={handleSubmit}>
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="addUserLabel">
                Ajouter un nouveau utilisateur
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nom"
                  name="name"
                  onChange={handleInput}
                />
                <label>Nom</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                />
                <label>Email</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={handleInput}
                />
                <label>Mot de passe</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  class="form-select"
                  name="type"
                  onChange={handleInput}
                  value={data.type}
                >
                  <option value="utilisateur">Simple utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
                <label>Type</label>
              </div>
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
              <button type="submit" class="btn btn-primary">
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
