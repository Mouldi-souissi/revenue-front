import { useRef, useState, ChangeEvent, FormEvent } from "react";
import store_user from "../../stores/store_user";
import { Notyf } from "notyf";
import { User } from "../../models/User";

const defaultUser: User = {
  _id: "",
  name: "",
  email: "",
  type: "utilisateur",
};

const notyf = new Notyf();

const AddUser = (): JSX.Element => {
  const [data, setData] = useState<User>(defaultUser);

  const addUser = store_user((state) => state.addUser);

  const refClose = useRef<HTMLButtonElement>(null);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();

      const success = await addUser(data);
      if (!success) {
        notyf.error("Opération échouée");
      } else {
        notyf.success("Opération réussie");
        setData(defaultUser);
        refClose.current?.click(); // Safe navigation with ?
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal fade" id="addUser" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit} autoComplete="off">
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
                  id="add-name"
                />
                <label htmlFor="add-name">Nom</label>
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
                  autoComplete="off"
                  id="add-email"
                />
                <label htmlFor="add-email">Email</label>
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
                  id="add-password"
                />
                <label htmlFor="add-password">Mot de passe</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  name="type"
                  onChange={handleInput}
                  value={data.type}
                  id="add-type"
                >
                  <option value="utilisateur">Simple utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
                <label htmlFor="add-type">Type</label>
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
