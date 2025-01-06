import { useRef, useState } from "react";
import store_move from "../../stores/store_move";
import { MOVE_TYPES, MOVE_SUBTYPES, ACCOUNT_TYPES } from "../../constants";
import { formatInput } from "../../helpers/input";
import MoveValidator from "../../payloadValidators/moveValidator";
import store_account from "../../stores/store_account";
import { Notyf } from "notyf";
const notyf = new Notyf();

const AddSpending = () => {
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const refClose = useRef();

  const addMove = store_move((state) => state.addMove);

  const accounts = store_account((state) => state.accounts);

  const handleInput = (e) => {
    const value = e.target.value;
    setAmount(formatInput(value));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const primaryAccount = accounts.find(
        (account) => account.type === ACCOUNT_TYPES.primary,
      );

      if (!primaryAccount) {
        notyf.error("Opération échouée");
        return;
      }

      const payload = new MoveValidator(
        MOVE_TYPES.out,
        MOVE_SUBTYPES.spending,
        amount,
        primaryAccount.name,
        primaryAccount._id,
        description,
      );

      const { isValid, error } = payload.isValid();

      if (!isValid) {
        notyf.error("Opération échouée");
        console.log({ error });
        return;
      }

      const success = await addMove(payload);
      if (!success) {
        notyf.error("Opération échouée");
      } else {
        notyf.success("Opération réussie");
        setAmount("");
        setDescription("");
        refClose.current.click();
      }
    } catch (error) {
      console.log(error);
      notyf.error("Opération échouée");
    } finally {
      setLoading(false);
    }
  };

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
                onChange={(e) => setDescription(e.target.value)}
                value={description}
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
                value={amount}
                required
                autoComplete="off"
              />
              <label>Montant</label>
            </div>
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
