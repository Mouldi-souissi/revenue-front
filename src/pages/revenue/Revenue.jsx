import { useState, useEffect } from "react";
import Wrapper from "../../components/layout/Wrapper";
import store_move from "../../stores/store_move";
import store_user from "../../stores/store_user";

const Revenue = () => {
  const [isLoading, setLoading] = useState(false);
  const [isVisible, toggleVisibility] = useState(false);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [user, setUser] = useState("all");

  const getRevenue = store_move((store) => store.getRevenue);
  const revenue = store_move((store) => store.revenue);

  const users = store_user((state) => state.users);
  const getUsers = store_user((state) => state.getUsers);

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getRevenue(
      new Date(start).toISOString(),
      new Date(end).toISOString(),
      user,
    ).finally(() => {
      toggleVisibility(true);
      setLoading(false);
    });
  };
  return (
    <Wrapper>
      <div className="d-flex align-items-start justify-content-between gap-2 p-3">
        <div className="d-flex gap-5 align-items-center">
          <div className="title">Recette</div>
          {isLoading && <div className="loader"></div>}
        </div>
      </div>
      <div className="card p-4">
        <form
          className="row align-items-center justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="col-lg-4 mb-3">
            <label className="">Date de début</label>
            <input
              type="datetime-local"
              className="form-control"
              name="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-4 mb-3">
            <label className="">Date de fin</label>
            <input
              type="datetime-local"
              className="form-control"
              name="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>

          <div className="col-lg-4 mb-3">
            <label>Utilisateur</label>

            <select
              className="form-select"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            >
              <option value="all">Tous</option>
              {users.map((user) => (
                <option value={user.name} key={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="button primary"
              disabled={isLoading}
            >
              Calculer
            </button>
          </div>
        </form>
      </div>
      {isVisible && (
        <div className="circles my-3">
          <div className="circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-bag"
              color="cyan"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            <div className="inner-circle">
              <div className="circle-title">Recette</div>
              <div className="d-flex align-items-baseline gap-2">
                <div className="circle-value">{revenue.revenue}</div>
                <div className="small">TND</div>
              </div>
            </div>
          </div>
          <div className="circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-arrow-up"
              color="yellowgreen"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m16 12-4-4-4 4" />
              <path d="M12 16V8" />
            </svg>
            <div className="inner-circle">
              <div className="circle-title">Ventes</div>
              <div className="d-flex align-items-baseline gap-2">
                <div className="circle-value">{revenue.totalSales}</div>
                <div className="small">TND</div>
              </div>
            </div>
          </div>
          <div className="circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-coins"
              color="yellow"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
              <path d="M7 6h1v4" />
              <path d="m16.71 13.88.7.71-2.82 2.82" />
            </svg>
            <div className="inner-circle">
              <div className="circle-title">Gain</div>
              <div className="d-flex align-items-baseline gap-2">
                <div className="circle-value">{revenue.totalWins}</div>
                <div className="small">TND</div>
              </div>
            </div>
          </div>
          <div className="circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-arrow-down"
              color="red"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="m8 12 4 4 4-4" />
            </svg>
            <div className="inner-circle">
              <div className="circle-title">Dépenses</div>
              <div className="d-flex align-items-baseline gap-2">
                <div className="circle-value">{revenue.totalSpending}</div>
                <div className="small">TND</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Revenue;
