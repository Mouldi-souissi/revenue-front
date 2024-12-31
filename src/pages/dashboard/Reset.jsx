import { useState, useRef } from "react";
import store_move from "../../stores/store_move";
import store_account from "../../stores/store_account";

const Reset = () => {
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const refClose = useRef();

  const reset = store_move((state) => state.reset);
  const getAccounts = store_account((state) => state.getAccounts);

  const handleInput = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError("");

      const success = await reset({ password });
      if (!success) {
        setError("mot de passe incorrect");
        return;
      }
      await getAccounts();

      setPassword("");
      refClose.current.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="reset" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form
          className="modal-content p-3"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-black">Réinitialisation du système</div>
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
                type="password"
                className="form-control"
                placeholder="Montant"
                name="passwordForReset"
                onChange={handleInput}
                value={password}
                autoComplete="off"
                required
              />
              <label>Code</label>
            </div>
          </div>
          {error && (
            <div className="d-flex align-items-center justify-content-center mb-3 text-danger">
              {error}
            </div>
          )}
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
                className="button text-danger"
                disabled={!password || isLoading}
              >
                <i className="fa-solid fa-power-off me-2"></i>
                Continuer
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Reset;
