import { useRef, useState, useEffect } from "react";
import store_user from "../../stores/store_user";
import store_shop from "../../stores/store_shop";
import { Notyf } from "notyf";
const notyf = new Notyf();

const AddUser = () => {
  const [data, setData] = useState({
    type: "utilisateur",
    name: "",
    email: "",
    password: "",
  });
  const addUser = store_user((state) => state.addUser);
  const refClose = useRef();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const success = await addUser(data);
      if (!success) {
        notyf.error("Opération échouée");
      } else {
        notyf.success("Opération réussie");
        setData({ type: "utilisateur", name: "", email: "", password: "" });
        refClose.current.click();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modal fade" id="addUser" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit}>
          <div className="modal-content p-3 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-black">Ajouter un nouveau utilisateur</div>

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
                />
                <label>Nom</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                  value={data.email}
                  required
                />
                <label>Email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={handleInput}
                  value={data.password}
                  required
                  autoComplete="off"
                />
                <label>Mot de passe</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  name="type"
                  onChange={handleInput}
                  value={data.type}
                >
                  <option value="utilisateur">Simple utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
                <label>Type</label>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
