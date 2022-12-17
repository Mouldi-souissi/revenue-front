import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const EditOut = ({ out }) => {
  const [data, setData] = useState("");
  const editOut = useStore((state) => state.editOut);
  const sites = useStore((state) => state.sites);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editOut(data);
    refClose.current.click();
  };

  useEffect(() => {
    setData(out);
  }, [out]);
  return (
    <div
      class="modal fade"
      id="editOut"
      tabindex="-1"
      aria-labelledby="editOutLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" onSubmit={handleSubmit}>
          <div class="modal-header">
            <h1 class="modal-title fs-5">Editer l'utilisateur</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {data.subType === "gain" && (
              <div className="form-floating mb-3">
                <select
                  class="form-select"
                  name="account"
                  onChange={handleInput}
                  value={data.account}
                >
                  {sites.map((site) => (
                    <option value={site.name}>{site.name}</option>
                  ))}
                </select>
                <label>Type</label>
              </div>
            )}

            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder={
                  data.subType === "gain" ? "client/Tél" : "Description"
                }
                name="description"
                onChange={handleInput}
                value={data.description}
              />
              <label>
                {data.subType === "gain" ? "client/Tél" : "Description"}
              </label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
                value={data.amount}
              />
              <label>Montant</label>
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
              Sauvgarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOut;
