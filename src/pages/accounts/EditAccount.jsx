import { useEffect, useRef, useState } from "react";
import store_account from "../../stores/store_account";
import { formatFloat } from "../../helpers/input";
import { Notyf } from "notyf";
const notyf = new Notyf();

const EditAccount = ({ account }) => {
  const [data, setData] = useState({
    name: "",
    rate: "",
  });
  const editAccount = store_account((state) => state.editAccount);
  const refClose = useRef();

  const handleInput = (e) => {
    if (e.target.name == "rate") {
      setData({ ...data, rate: formatFloat(e.target.value) });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const success = await editAccount(data._id, {
        rate: data.rate,
        name: data.name,
      });
      if (!success) {
        notyf.error("Opération échouée");
      } else {
        notyf.success("Opération réussie");
        setData({ name: "", rate: "" });
        refClose.current.click();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (account) {
      setData({
        name: account.name,
        _id: account._id,
        rate: account.rate,
      });
    }
  }, [account]);

  return (
    <div className="modal fade" id="editAccount">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content p-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="modal-title fs-5">
              {`Editer le compte ${account?.name}`}
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
                autoComplete="off"
                required
                id="edit-name"
              />
              <label htmlFor="edit-name">Nom</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Taux de change"
                name="rate"
                onChange={handleInput}
                value={data.rate}
                autoComplete="off"
                required
                id="edit-rate"
              />
              <label htmlFor="edit-rate">Taux de change</label>
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
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
