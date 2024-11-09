import React, { useEffect, useRef, useState } from "react";
import useStore from "../../../store";

const AddAmount = ({ account }) => {
  const [data, setData] = useState({
    type: "entrée",
    subType: "versement",
    account: "",
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

  useEffect(() => {
    setData({ ...data, account: account?.name });
  }, [account]);

  return (
    <div className="modal fade" id="addAmount" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content p-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-black">Alimenter {account?.name}</div>
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
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
                value={data.amount}
              />
              <label>Montant</label>
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
            <button
              type="submit"
              className="button primary"
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

export default AddAmount;
