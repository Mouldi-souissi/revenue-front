import React, { useEffect, useState } from "react";
import useStore from "../../../store";

const Dashboard = () => {
  const getAccounts = useStore((state) => state.getAccounts);
  const accounts = useStore((state) => state.accounts);
  const getMoves = useStore((state) => state.getMoves);
  const moves = useStore((state) => state.moves);
  const [period, setPeriod] = useState("daily");

  useEffect(() => {
    // if (!accounts.length) {
    getAccounts();
    // }
  }, []);

  useEffect(() => {
    getMoves();
  }, []);

  const handlePeriod = (e) => {
    const selected = e.target.value;
    setPeriod(selected);
    getMoves(selected);
  };

  return (
    <div className="container">
      <div className="dashboard_cards">
        {accounts.map((account) => (
          <div className="dashboard_card" key={account._id}>
            <div className="card_title">{account.name}</div>
            <div className="d-flex justify-content-between w-100 align-items-start">
              <i className="fa-solid fa-landmark mt-2"></i>
              <div>
                <div className="card_value">{account.deposit}</div>
                <div
                  className={`small ${
                    account.lastMove.type === "sortie" ? "red" : "green"
                  }`}
                >
                  {account.lastMove.type === "entrée" && "+"}
                  {account.lastMove.type === "sortie" && "-"}
                  {account.lastMove.amount}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
      </div>

      <table className="table mb-5">
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
              <td>{move.amount}</td>
              <td>{move.user}</td>
              <td>{new Date(move.date).toLocaleString("fr")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
