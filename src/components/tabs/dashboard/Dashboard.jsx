import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import AddAmount from "./AddAmount";
import DeleteMoves from "./DeleteMoves";

const Dashboard = () => {
  const getMoves = useStore((state) => state.getMoves);
  const moves = useStore((state) => state.moves);
  const userType = useStore((state) => state.userType);
  const isLoading = useStore((state) => state.isLoading);
  const [period, setPeriod] = useState("daily");

  const getFondState = useStore((state) => state.getFondState);
  const fondState = useStore((state) => state.fondState);

  useEffect(() => {
    if (userType === "admin") {
      getFondState();
    }
  }, [userType]);

  useEffect(() => {
    if (userType === "admin") {
      getMoves();
    }
  }, [userType]);

  const handlePeriod = (e) => {
    const selected = e.target.value;
    setPeriod(selected);
    getMoves(selected);
  };

  return (
    <div className="container">
      <div className="dashboard_cards">
        <div className="dashboard_card">
          <div className="d-flex justify-content-between align-items-start w-100">
            <div className="card_title">Fond</div>
            <i
              className="fa-solid fa-plus btn addDeposit"
              data-bs-toggle="modal"
              data-bs-target="#addAmount"
            />
          </div>
          <div className="d-flex justify-content-between w-100 align-items-start">
            <i className="fa-solid fa-landmark mt-2"></i>
            <div>
              <div className="card_value">
                {fondState.toLocaleString("fr", {
                  style: "currency",
                  currency: "TND",
                  minimumFractionDigits: 0,
                })}
              </div>
              {/* <div
            className={`small ${
              account.lastMove.type === "sortie" ? "red" : "green"
            }`}
          >
            {account.lastMove.type === "entrée" && "+"}
            {account.lastMove.type === "sortie" && "-"}
            {Number(account.lastMove.amount).toLocaleString("fr", {
              style: "currency",
              currency: "TND",
              minimumFractionDigits: 0,
            })}
          </div> */}
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center my-5">
          <div className="loader"></div>
        </div>
      )}
      <div className="d-flex align-items-center justify-content-center my-5">
        <h5 className="me-5 mb-0">Les movements</h5>

        <select
          className="form-select col-lg-6"
          style={{ maxWidth: "250px" }}
          value={period}
          onChange={handlePeriod}
        >
          <option value="daily">Ce jour</option>
          <option value="weekly">Cette semaine</option>
          <option value="monthly">Ce mois</option>
        </select>

        <i
          className="fa-solid fa-trash btn text-danger"
          data-bs-toggle="modal"
          data-bs-target="#deleteAllMoves"
        ></i>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Compte</th>
              <th scope="col">Type</th>
              <th scope="col">Categorie</th>
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {moves.map((move) => (
              <tr key={move._id}>
                <td>{move.account}</td>
                <td>{move.type}</td>
                <td>{move.subType}</td>
                <td>
                  {Number(move.amount).toLocaleString("fr", {
                    style: "currency",
                    currency: "TND",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td>{move.user}</td>
                <td className="date">
                  {new Date(move.date).toLocaleString("fr", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteMoves />
      <AddAmount />
    </div>
  );
};

export default Dashboard;
