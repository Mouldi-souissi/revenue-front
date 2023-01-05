import React, { useRef, useState } from "react";
import useStore from "../../../store";

const AddAccount = () => {
  const [data, setData] = useState("");
  const addAccount = useStore((state) => state.addAccount);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAccount(data);
    refClose.current.click();
  };

  return (
    <div
      className="modal fade"
      id="addSite"
      tabIndex="-1"
      aria-labelledby="addSiteLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addSiteLabel">
              Ajouter un nouveau compte
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nom"
                name="name"
                onChange={handleInput}
                required
                autoComplete="off"
              />
              <label>Nom</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Lien du logo"
                name="img"
                onChange={handleInput}
              />
              <label>Lien de logo</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Solde"
                name="deposit"
                onChange={handleInput}
                required
                autoComplete="off"
              />
              <label>Solde</label>
            </div>
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
            <button type="submit" className="btn btn-secondary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;
