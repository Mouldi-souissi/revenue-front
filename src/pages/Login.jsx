import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import userIcon from "/user.svg";
import useStore from "../store";
import cash from "/cash.jpg";

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
    <div className="container py-5">
      <div className="signinCard">
        <div className="row">
          <div className="col-lg-6 signup_container">
            <div className="signup_hero text-center">
              {/*<img alt="logo" src={cash} className="mb-3" width="200px" />*/}

              <div className="signup_hero_text mt-2">Caisse</div>
            </div>
            <div className="signup_img">
              <img src={cash} alt="signup" className="" />
            </div>
          </div>

          <form className="col-lg-6 p-5" onSubmit={handleLogin}>
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
              <i class="fa-regular fa-user fs-2 mb-3" />
              <div className="form-floating mb-3 w-100">
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

              <div className="form-floating mb-3 w-100">
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

              <div className="form-floating mb-3 w-100">
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

              <button className="button primary w-100" type="submit">
                SE CONNECTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
