import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import userIcon from "/user.svg";
import useStore from "../store";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "", shop: "aouina" });
  const login = useStore((state) => state.login);
  const getAllshops = useStore((state) => state.getAllshops);
  const shops = useStore((state) => state.shops);
  const history = useHistory();

  useEffect(() => {
    if (!shops.length) {
      getAllshops();
    }
  }, []);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      await login(data.email, data.password, data.shop);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login d-flex align-items-center justify-content-center">
      <div className="card shadow p-4 col-lg-4">
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={userIcon}
            alt="profile_picture"
            className="img-fluid mb-5"
            width="50px"
          />
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-floating  mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={handleInput}
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
            />
            <label>Mot de passe</label>
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

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-secondary">
              Connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
