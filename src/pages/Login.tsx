import { ChangeEvent, FormEvent, useState } from "react";
import cash from "/cash.webp";
import store_user from "../stores/store_user";
import notification from "../libs/notification";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const login = store_user((state) => state.login);
  const [isLoading, setLoading] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const success = await login(data.email, data.password);
      if (!success) {
        notification.error("Connexion échouée");
      } else {
        notification.success("Connexion réussie");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="signinCard">
        <div className="row">
          <div className="col-lg-6 signup_container">
            <div className="signup_hero text-center">
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
