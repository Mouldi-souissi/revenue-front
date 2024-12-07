import { useEffect, useRef, useState } from "react";
import store_account from "../../stores/store_account";
import store_move from "../../stores/store_move";
import { MOVE_TYPES, MOVE_SUBTYPES } from "../../constants";

const AddSale = () => {
  const [data, setData] = useState({ depositEnd: "" });
  const [error, setError] = useState("");
  const [errorAmount, setErrorAmount] = useState("");

  const addMove = store_move((state) => state.addMove);

  const getAccounts = store_account((state) => state.getAccounts);
  const accounts = store_account((state) => state.accounts);

  const refClose = useRef();
  const [isLoading, setLoading] = useState(false);

  const handleInput = (e) => {
    let isValid = true;
    if (e.target.name === "depositEnd") {
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
    e.preventDefault();
    try {
      setLoading(true);
      const accounts_state = await getAccounts();
      const account = accounts_state.find((acc) => acc.name === data.account);

      const amount =
        (Number(account.deposit) - Number(data.depositEnd)) *
        Number(account.rate);

      if (amount <= 0) {
        setErrorAmount(
          "La vente ne peut pas etre negative! veillez entrer les gains d'abord"
        );
        return;
      } else {
        setErrorAmount("");
        await addMove({
          amount: Number(amount).toFixed(0),
          type: MOVE_TYPES.in,
          subType: MOVE_SUBTYPES.sale,
          account: account.name,
        });
        refClose.current.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const filtered = accounts.filter((account) => account.type !== "primary");
    if (filtered.length) {
      setData({
        ...data,
        account: filtered[0]?.name,
      });
    }
  }, [accounts]);

  return (
    <div className="modal fade" id="addSale" tabIndex="-1" aria-hidden="true">
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
            {errorAmount && (
              <small className="text-danger my-3">{errorAmount}</small>
            )}
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="account"
                onChange={handleInput}
                value={data.account}
              >
                {accounts
                  .filter((account) => account.type !== "primary")
                  .map((account) => (
                    <option key={account._id} value={account.name}>
                      {account.name}
                    </option>
                  ))}
              </select>
              <label>Type</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Montant"
                name="depositEnd"
                onChange={handleInput}
                value={data.depositEnd}
                required
                autoComplete="off"
              />
              <label>Balance {data.account} fin</label>
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

export default AddSale;
