import { useRef, useState } from "react";
import store_account from "../../stores/store_account";

const AddAccount = () => {
  const [data, setData] = useState("");
  const addAccount = store_account((state) => state.addAccount);
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
        <form className="modal-content p-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
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
          <div className="modal-body my-3">
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
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;
