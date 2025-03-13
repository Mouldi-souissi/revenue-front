import { ChangeEvent, FormEvent, useRef, useState } from "react";
import store_account from "../../stores/store_account";
import store_move from "../../stores/store_move";
import { MOVE_TYPES, MOVE_SUBTYPES, ACCOUNT_TYPES } from "../../constants";
import { formatInput } from "../../helpers/input";
import MoveBuilder from "../../payloadValidators/MoveBuilder";
import notification from "../../libs/notification";

const AddSale = () => {
  const [isLoading, setLoading] = useState(false);
  const [depositEnd, setDepositEnd] = useState<string | number>("");
  const refClose = useRef<HTMLButtonElement>(null);

  const addMove = store_move((state) => state.addMove);

  const getAccounts = store_account((state) => state.getAccounts);
  const accounts = store_account((state) => state.accounts);
  const selectedAccount = store_account((state) => state.selectedAccount);
  const selectAccount = store_account((state) => state.selectAccount);
  const resetAccount = store_account((state) => state.resetAccount);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    setDepositEnd(formatInput(value));
  };

  const setSelectedAccount = (id: string) => {
    const account = accounts.find((acc) => acc._id === id);
    if (account) {
      selectAccount(account);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const accounts_state = await getAccounts();

      if (!accounts_state || !accounts.length) {
        notification.error("Opération échouée");
        return;
      }

      const account = accounts_state.find(
        (acc) => acc._id === selectedAccount._id,
      );

      if (!account) {
        notification.error("Opération échouée");
        return;
      }

      const amount =
        (Number(account.deposit) - Number(depositEnd)) * Number(account.rate);

      if (amount <= 0) {
        notification.error(
          "La vente ne peut pas etre negative! Veuillez saisir les gains d'abord",
        );
        return;
      }
      const payload = new MoveBuilder(
        MOVE_TYPES.in,
        MOVE_SUBTYPES.sale,
        Number(amount).toFixed(0),
        selectedAccount.name,
        selectedAccount._id,
      );

      const { isValid, error } = payload.isValid();

      if (!isValid) {
        notification.error("Opération échouée");

        console.log({ error });
        return;
      }

      const success = await addMove(payload.getMove());

      if (!success) {
        notification.error("Opération échouée");
      } else {
        notification.success("Opération réussie");
        setDepositEnd("");
        resetAccount();
        refClose.current?.click();
      }
    } catch (error) {
      console.log(error);
      notification.error("Opération échouée");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="addSale" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content p-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-black">Ajouter une vente</div>
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
              <select
                className="form-select"
                name="account"
                onChange={(e) => setSelectedAccount(e.target.value)}
                value={selectedAccount._id}
                id="sale-account"
              >
                {accounts
                  .filter((account) => account.type !== ACCOUNT_TYPES.primary)
                  .map((account) => (
                    <option key={account._id} value={account._id}>
                      {account.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="sale-account">Type</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="depositEnd"
                onChange={handleInput}
                value={depositEnd}
                required
                autoComplete="off"
                id="sale-deposit"
              />
              <label htmlFor="sale-deposit">
                Balance {selectedAccount.name} fin
              </label>
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

export default AddSale;
