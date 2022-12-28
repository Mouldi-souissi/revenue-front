import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import userIcon from "../assets/user.svg";
import useStore from "../store";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const login = useStore((state) => state.login);
  const history = useHistory();

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(data.email, data.password);
    history.push("/");
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

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
