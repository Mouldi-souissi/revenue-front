import { ChangeEvent, FormEvent, useRef, useState } from "react";
import store_account from "../../stores/store_account";
import { formatFloat } from "../../helpers/input";
import { Notyf } from "notyf";
import { AccountPayload } from "../../models/Account";
const notyf = new Notyf();

const defaultPayload: AccountPayload = {
  rate: "1.2",
  name: "",
  deposit: 0,
  type: "secondary",
};

const AddAccount = () => {
  const [data, setData] = useState(defaultPayload);
  const addAccount = store_account((state) => state.addAccount);
  const refClose = useRef<HTMLButtonElement>(null);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.name == "rate") {
      setData({ ...data, rate: formatFloat(e.target.value) });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const success = await addAccount(data);
      if (!success) {
        notyf.error("Opération échouée");
      } else {
        notyf.success("Opération réussie");
        setData(defaultPayload);
        refClose.current?.click();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="modal fade"
      id="addSite"
      tabIndex={-1}
      aria-labelledby="addSiteLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content p-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="modal-title fs-5" id="addSiteLabel">
              Ajouter un nouveau compte
            </h1>
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
                placeholder="Nom"
                name="name"
                onChange={handleInput}
                value={data.name}
                required
                autoComplete="off"
                id="add-name"
              />
              <label htmlFor="add-name">Nom</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Taux"
                name="rate"
                onChange={handleInput}
                value={data.rate}
                autoComplete="off"
                required
                id="add-rate"
              />
              <label htmlFor="add-rate">Taux</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Solde"
                name="deposit"
                onChange={handleInput}
                value={data.deposit}
                required
                autoComplete="off"
                id="add-deposit"
              />
              <label htmlFor="add-deposit">Solde</label>
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
            <button type="submit" className="button primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;
