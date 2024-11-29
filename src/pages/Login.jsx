import { useEffect, useState } from "react";
import cash from "/cash.webp";
import { useLocation } from "wouter";
import store_shop from "../stores/store_shop";
import store_user from "../stores/store_user";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "", shop: "aouina" });

  const login = store_user((state) => state.login);
  const checkAuth = store_user((store) => store.checkAuth);
  const activeTab = store_user((store) => store.activeTab);
  const isAuthenticated = store_user((store) => store.isAuthenticated);
  const loginError = store_user((store) => store.loginError);

  const getAllshops = store_shop((state) => state.getAllshops);
  const shops = store_shop((state) => state.shops);

  const [location, setLocation] = useLocation();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!shops.length) {
      setLoading(true);
      getAllshops().finally(() => setLoading(false));
    }
  }, []);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await login(data.email, data.password, data.shop);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {loginError && (
        <div className="alert alert-danger mt-2" role="alert">
          {loginError}
        </div>
      )}
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
              <i className="fa-regular fa-user fs-2 mb-3" />
              <div className="form-floating mb-3 w-100">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={handleInput}
                  required
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
                <label>Mot de passe</label>
              </div>

              <div className="form-floating mb-3 w-100">
                <select
                  className="form-select"
                  name="shop"
                  onChange={handleInput}
                  value={data.shop}
                  disabled={isLoading}
                >
                  {shops.map((shop) => (
                    <option key={shop._id} value={shop.name}>
                      {shop.name}
                    </option>
                  ))}
                </select>
                <label>shop</label>
              </div>

              {isLoading && <div className="loader"></div>}
              {!isLoading && (
                <button
                  className="button primary w-100"
                  type="submit"
                  disabled={isLoading}
                >
                  SE CONNECTER
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
