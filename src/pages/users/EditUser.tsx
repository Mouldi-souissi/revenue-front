import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import store_user from "../../stores/store_user";
import { User, UserEditPayload } from "../../models/User";
import notification from "../../libs/notification";

type props = {
  user: User;
};

const defaultUser: UserEditPayload = {
  name: "",
  type: "utilisateur",
};

const EditUser = ({ user }: props) => {
  const [data, setData] = useState<UserEditPayload>(defaultUser);
  const editUser = store_user((state) => state.editUser);
  const refClose = useRef<HTMLButtonElement>(null);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const success = await editUser({
        ...user,
        name: data.name,
        type: data.type,
      });

      if (!success) {
        notification.error("Opération échouée");
      } else {
        notification.success("Opération réussie");
        setData(defaultUser);
        refClose.current?.click();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      setData(user);
    }
  }, [user]);

  return (
    <div
      className="modal fade"
      id="editUser"
      tabIndex={-1}
      aria-labelledby="editUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content p-3 p-3" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-black">Editer l'utilisateur</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body my-3 my-3">
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
                id="edit-name"
              />
              <label htmlFor="edit-name">Nom</label>
            </div>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="type"
                onChange={handleInput}
                value={data.type}
                id="edit-type"
              >
                <option value="utilisateur">Utilisateur</option>
                <option value="admin">Admin</option>
              </select>
              <label htmlFor="edit-type">Type</label>
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
              Sauvgarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
