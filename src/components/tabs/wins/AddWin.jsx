import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddWin = () => {
  const [data, setData] = useState({
    amount: "",
    type: "sortie",
    subType: "gain",
  });
  const [error, setError] = useState("");
  const addMove = useStore((state) => state.addMove);
  const accounts = useStore((state) => state.accounts);
  const refClose = useRef();
  const [isLoading, setLoading] = useState(false);

  const handleInput = (e) => {
    let isValid = true;
    if (e.target.name === "amount") {
      isValid = validateInput(e);
    }

    if (isValid) {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const validateInput = (event) => {
    if (!/^[0-9]+$/.test(event.target.value)) {
      setError("Seuls les numéros sont autorisés");
      setData({ ...data, [event.target.name]: "" });
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      await addMove(data);
      refClose.current.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData({
      ...data,
      account: accounts.filter((account) => account.name !== "Fond")[0]?.name,
    });
  }, [accounts]);

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
                required
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
            <div className="form-floating ">
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
                value={data.amount}
                required
                autoComplete="off"
              />
              <label>Montant</label>
            </div>
            {!!error.length && (
              <small className="ms-2 text-danger">{error}</small>
            )}
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
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWin;
