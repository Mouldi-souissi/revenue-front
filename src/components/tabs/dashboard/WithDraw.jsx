import React, { useRef, useState } from "react";
import useStore from "../../../store";

const WithDraw = () => {
  const [data, setData] = useState({
    type: "sortie",
    subType: "retrait",
    account: "Fond",
    amount: "",
  });
  const addMove = useStore((state) => state.addMove);
  const refClose = useRef();
  const [isLoading, setLoading] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value;
    if (Number(e.target.value) > 0) {
      setData({ ...data, amount: Number(value) });
    } else {
      setData({ ...data, amount: "" });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (data.amount) {
        await addMove(data);
        refClose.current.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="modal fade" id="withdraw" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Retrait Fond</h1>
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
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
                value={data.amount}
              />
              <label>Montant</label>
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
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={!data.amount || isLoading}
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithDraw;
