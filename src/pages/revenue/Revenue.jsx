import { useState, useEffect } from "react";
import Wrapper from "../../components/layout/Wrapper";
import store_move from "../../stores/store_move";
import store_user from "../../stores/store_user";
import {
  formatDateTimeLocal,
  getStartOfday,
  getEndOfday,
  subtract30Days,
} from "../../helpers/timeAndDate";
import RevenueCards from "../shared/RevenueCards";

const Revenue = () => {
  const today = new Date();
  const startOfDay = formatDateTimeLocal(getStartOfday(today));
  const endOfDay = formatDateTimeLocal(getEndOfday(today));
  const thirtydays = formatDateTimeLocal(subtract30Days(today));

  const [isLoading, setLoading] = useState(false);
  const [isVisible, toggleVisibility] = useState(false);
  const [start, setStart] = useState(startOfDay);
  const [end, setEnd] = useState(endOfDay);
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
          <div className="col-lg-3 mb-3">
            <label className="">Date de début</label>
            <input
              type="datetime-local"
              className="form-control"
              name="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
              max={end}
              min={thirtydays}
            />
          </div>

          <div className="col-lg-3 mb-3">
            <label className="">Date de fin</label>
            <input
              type="datetime-local"
              className="form-control"
              name="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
              min={start}
              max={end}
            />
          </div>

          <div className="col-lg-3 mb-3">
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
          <div className="col-lg-3">
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="button primary"
                disabled={isLoading}
              >
                Calculer
              </button>
            </div>
          </div>
        </form>
      </div>
      {isVisible && (
        <RevenueCards
          sales={revenue.totalSales}
          wins={revenue.totalWins}
          spending={revenue.totalSpending}
          revenue={revenue.revenue}
        />
      )}
    </Wrapper>
  );
};

export default Revenue;
