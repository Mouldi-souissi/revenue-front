import { useEffect, useRef, useState } from "react";
import store_move from "../../stores/store_move";
import { MOVE_TYPES, MOVE_SUBTYPES } from "../../constants";

const AddSpending = () => {
  const [data, setData] = useState({
    type: MOVE_TYPES.out,
    subType: MOVE_SUBTYPES.spending,
    account: "Fond",
    amount: "",
  });
  const [error, setError] = useState("");
  const addMove = store_move((state) => state.addMove);
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
      e.preventDefault();
      setLoading(true);
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
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="addSpending"
      tabIndex="-1"
      aria-labelledby="addSpendingLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content p-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-black" id="addSpendingLabel">
              Ajouter une dépense
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={refClose}
            ></button>
          </div>
          <div className="modal-body my-3">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                onChange={handleInput}
                required
                autoComplete="off"
              />
              <label>Description</label>
            </div>
            <div className="form-floating">
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
          <div className="d-flex align-items-center justify-content-center mb-3">
            {isLoading && <div className="loader"></div>}
          </div>
          {!isLoading && (
            <div className="d-flex justify-content-end align-items-center gap-2">
              <button type="button" className="button" data-bs-dismiss="modal">
                Fermer
              </button>
              <button
                type="submit"
                className="button primary"
                disabled={isLoading}
              >
                Ajouter
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddSpending;
