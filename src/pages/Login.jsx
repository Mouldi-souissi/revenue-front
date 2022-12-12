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
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={handleInput}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleInput}
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
