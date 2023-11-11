import React, { useRef, useState, useEffect } from "react";
import useStore from "../../../store";

const AddUser = () => {
  const [data, setData] = useState({ type: "utilisateur", shop: "aouina" });
  const addUser = useStore((state) => state.addUser);
  const getAllshops = useStore((state) => state.getAllshops);
  const shops = useStore((state) => state.shops);
  const refClose = useRef();

  useEffect(() => {
    getAllshops();
  }, []);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(data);
    refClose.current.click();
  };
  return (
    <div className="modal fade" id="addUser" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                Ajouter un nouveau utilisateur
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  name="name"
                  onChange={handleInput}
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
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  name="shop"
                  onChange={handleInput}
                  value={data.shop}
                >
                  {shops.map((shop) => (
                    <option key={shop._id} value={shop.name}>
                      {shop.name}
                    </option>
                  ))}
                </select>
                <label>shop</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Fermer
              </button>
              <button type="submit" className="btn btn-secondary">
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
