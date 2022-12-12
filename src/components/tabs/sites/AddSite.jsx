import React, { useState } from "react";
import useStore from "../../../store";

const AddSite = () => {
  const [data, setData] = useState("");
  const addSite = useStore((state) => state.addSite);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSite(data);
  };

  return (
    <div
      class="modal fade"
      id="addSite"
      tabindex="-1"
      aria-labelledby="addSiteLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" onSubmit={handleSubmit}>
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addSiteLabel">
              Ajouter un nouveau site
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
                type="text"
                class="form-control"
                placeholder="Taux de change"
                name="rate"
                onChange={handleInput}
              />
              <label>Taux de change</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Lien du logo"
                name="img"
                onChange={handleInput}
              />
              <label>Lien de logo</label>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
            <button type="submit" class="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSite;
