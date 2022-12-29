import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddWin = () => {
  const [data, setData] = useState("");
  const addMove = useStore((state) => state.addMove);
  const accounts = useStore((state) => state.accounts);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMove(data);
    refClose.current.click();
  };

  // const handleAccount = (e) => {
  //   const accountId = e.target.value;
  //   setData({
  //     ...data,
  //     account: {
  //       name: accounts.find((acc) => acc._id === accountId).name,
  //       id: accountId,
  //     },
  //   });
  // };

  useEffect(() => {
    setData({
      ...data,
      type: "sortie",
      subType: "gain",
      account: accounts[0]?.name,
    });
  }, []);

  return (
    <div className="modal fade" id="addWin" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Ajouter un gain</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="account"
                onChange={handleInput}
              >
                {accounts
                  .filter((account) => account.name !== "Fond")
                  .map((account) => (
                    <option key={account?._id} value={account?.name}>
                      {account?.name}
                    </option>
                  ))}
              </select>
              <label>Type</label>
            </div>

            {/* <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="client/Tél"
                name="description"
                onChange={handleInput}
              />
              <label>client/Tél</label>
            </div> */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
              />
              <label>Montant</label>
            </div>
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
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWin;
