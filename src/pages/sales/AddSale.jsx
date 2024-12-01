import { useEffect, useRef, useState } from "react";
import store_account from "../../stores/store_account";
import store_move from "../../stores/store_move";

const AddSale = () => {
  const [data, setData] = useState({ depositEnd: "" });
  const [error, setError] = useState("");
  const [errorAmount, setErrorAmount] = useState("");

  const addMove = store_move((state) => state.addMove);
  const getTotalWins = store_move((state) => state.getTotalWins);
  const getSpending = store_move((state) => state.getSpending);

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
      const accounts_res = await getAccounts();
      const account = accounts.find((acc) => acc.name === data.account);
      const totalWins = await getTotalWins(account.name);
      const spendings_res = await getSpending();

      const totalSpending = spendings_res.reduce(
        (acc, curr) => (acc += Number(curr.amount)),
        0,
      );

      const amount =
        (Number(account.deposit) - Number(data.depositEnd)) *
        Number(account.rate);
      const netSale = amount - totalWins - totalSpending;

      if (amount <= 0) {
        setErrorAmount(
          "La vente ne peut pas etre negative! veillez entrer les gains d'abord",
        );
        return;
      } else {
        setErrorAmount("");
        await addMove({
          amount: Number(amount).toFixed(0),
          type: "entrée",
          subType: "vente",
          account: account.name,
          description: Number(netSale).toFixed(0),
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
    setData({
      ...data,
      account: accounts.filter((account) => account.name !== "Fond")[0]?.name,
    });
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
                  .filter((account) => account.name !== "Fond")
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

export default AddSale;
