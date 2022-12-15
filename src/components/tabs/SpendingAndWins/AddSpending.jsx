import React, { useEffect, useState } from "react";
import useStore from "../../../store";

const AddSpending = ({ modalType }) => {
  const [data, setData] = useState({ type: "sortie" });
  const addOutDoc = useStore((state) => state.addOutDoc);
  const sites = useStore((state) => state.sites);
  const getSites = useStore((state) => state.getSites);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOutDoc(data);
    // type,
    // subType,
    // amount,
    // account,
    // description,
    // user
  };

  useEffect(() => {
    if (modalType === "gain" && !sites.length) {
      getSites();
    }
    setData({
      ...data,
      subType: modalType,
      account: modalType === "gain" ? sites[0] : "Fond",
    });
  }, [modalType]);

  return (
    <div
      class="modal fade"
      id="addSpending"
      tabindex="-1"
      aria-labelledby="addSpendingLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form class="modal-content" onSubmit={handleSubmit}>
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addSpendingLabel">
              Ajouter {modalType === "gain" ? "un gain" : "une dépense"}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div className="form-floating mb-3">
              <select class="form-select" name="account" onChange={handleInput}>
                {sites.map((site) => (
                  <option value={site.name}>{site.name}</option>
                ))}
              </select>
              <label>Type</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder={
                  modalType === "gain" ? "client/Tél" : "Description"
                }
                name="description"
                onChange={handleInput}
              />
              <label>
                {modalType === "gain" ? "client/Tél" : "Description"}
              </label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
              />
              <label>Montant</label>
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

export default AddSpending;
