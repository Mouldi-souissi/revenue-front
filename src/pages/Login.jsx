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
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleInput}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
