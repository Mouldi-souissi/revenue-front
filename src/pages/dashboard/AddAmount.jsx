import { useRef, useState } from "react";
import store_move from "../../stores/store_move";
import store_account from "../../stores/store_account";
import { MOVE_TYPES, MOVE_SUBTYPES } from "../../constants";
import MoveValidator from "../../payloadValidators/moveValidator";
import { formatInput } from "../../helpers/input";
import { Notyf } from "notyf";
const notyf = new Notyf();

const AddAmount = () => {
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const refClose = useRef();

  const addMove = store_move((state) => state.addMove);

  const getAccounts = store_account((state) => state.getAccounts);
  const selectedAccount = store_account((state) => state.selectedAccount);
  const resetAccount = store_account((state) => state.resetAccount);

  const handleInput = (e) => {
    const value = e.target.value;
    setAmount(formatInput(value));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const payload = new MoveValidator(
        MOVE_TYPES.in,
        MOVE_SUBTYPES.deposit,
        amount,
        selectedAccount.name,
        selectedAccount._id,
      );

      const { isValid, error } = payload.isValid();

      if (!isValid) {
        notyf.error("Opération échouée");
        return;
      }

      const success = await addMove(payload);

      if (!success) {
        notyf.error("Opération échouée");
      } else {
        await getAccounts();
        notyf.success("Opération réussie");
        setAmount("");
        resetAccount();
        refClose.current.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="addAmount" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content p-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-black">Alimenter {selectedAccount.name}</div>
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
                placeholder="Montant"
                name="amount"
                onChange={handleInput}
                value={amount}
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
              <button type="button" data-bs-dismiss="modal">
                Fermer
              </button>
              <button
                type="submit"
                className="primary"
                disabled={!amount || isLoading}
              >
                Sauvegarder
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAmount;
