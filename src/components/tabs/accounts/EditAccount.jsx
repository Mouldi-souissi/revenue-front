import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const EditAccount = ({ account }) => {
  const [data, setData] = useState("");
  const editAccount = useStore((state) => state.editAccount);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editAccount(data);
    refClose.current.click();
  };

  useEffect(() => {
    setData(account);
  }, [account]);

  return (
    <div class="modal fade" id="editAccount">
      <div class="modal-dialog">
        <form class="modal-content" onSubmit={handleSubmit}>
          <div class="modal-header">
            <h1 class="modal-title fs-5">
              {`Editer le compte ${account?.name}`}
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
                value={data.name}
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
                value={data.rate}
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
                value={data.img}
              />
              <label>Lien de logo</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Solde"
                name="deposit"
                onChange={handleInput}
                value={data.deposit}
              />
              <label>Solde</label>
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
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
