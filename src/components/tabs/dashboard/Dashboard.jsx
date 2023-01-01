import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import DeleteMove from "../../DeleteMove";
import AddAmount from "./AddAmount";
import DeleteMoves from "./DeleteMoves";

const Dashboard = () => {
  const getMoves = useStore((state) => state.getMoves);
  const moves = useStore((state) => state.moves);
  const userType = useStore((state) => state.userType);
  const isLoading = useStore((state) => state.isLoading);
  const [period, setPeriod] = useState("daily");
  const [move, setMove] = useState("");
  const [accountDoc, setAccountDoc] = useState("");

  const getAccounts = useStore((state) => state.getAccounts);
  const accounts = useStore((state) => state.accounts);

  const calulateStats = (type) => {
    let total = 0;
    if (type === "recette") {
      for (let move of moves) {
        if (move.type === "entrée") {
          total += Number(move.amount);
        }
        if (move.type === "sortie") {
          total -= Number(move.amount);
        }
      }
    }
    if (type === "gain") {
      total = moves
        .filter((move) => move.subType === "gain")
        .reduce((acc, curr) => (acc += Number(curr.amount)), 0);
    }
    if (type === "spending") {
      total = moves
        .filter((move) => move.subType === "dépense")
        .reduce((acc, curr) => (acc += Number(curr.amount)), 0);
    }
    if (type === "vente") {
      total = moves
        .filter((move) => move.subType === "vente")
        .reduce((acc, curr) => (acc += Number(curr.amount)), 0);
    }
    return total.toFixed(0);
  };

  const recette = calulateStats("recette");
  const gain = calulateStats("gain");
  const spending = calulateStats("spending");
  const vente = calulateStats("vente");

  useEffect(() => {
    if (userType === "admin") {
      getAccounts();
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
        {accounts.map((account) => (
          <div className="dashboard_card" key={account._id}>
            <div className="d-flex justify-content-between align-items-start w-100">
              <div className="card_title">{account.name}</div>
              <i
                className="fa-solid fa-plus btn addDeposit"
                data-bs-toggle="modal"
                data-bs-target="#addAmount"
                onClick={() => setAccountDoc(account)}
              />
            </div>
            <div className="d-flex justify-content-between w-100 align-items-start">
              <i className="fa-solid fa-landmark mt-2"></i>
              <div>
                <div className="card_value">
                  {Number(account.deposit).toLocaleString("fr", {
                    style: "currency",
                    currency: "TND",
                    minimumFractionDigits: 0,
                  })}
                </div>
                <div
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="circles my-5">
        <div className="circle">
          <div className="inner-circle">
            <div className="circle-title">Recette</div>
            <div className="circle-value">{recette}</div>
            <div>TND</div>
          </div>
        </div>
        <div className="circle">
          <div className="inner-circle">
            <div className="circle-title">Ventes</div>
            <div className="circle-value">{vente}</div>
            <div>TND</div>
          </div>
        </div>
        <div className="circle">
          <div className="inner-circle">
            <div className="circle-title">Gain</div>
            <div className="circle-value">{gain}</div>
            <div>TND</div>
          </div>
        </div>
        <div className="circle">
          <div className="inner-circle">
            <div className="circle-title">Dépenses</div>
            <div className="circle-value">{spending}</div>
            <div>TND</div>
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
        <div className="d-flex">
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

          {/* <i
            className="fa-solid fa-trash btn text-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteAllMoves"
          ></i> */}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          {/* <caption className="w-100">List of users</caption> */}
          <thead>
            <tr>
              <th scope="col">Compte</th>
              <th scope="col">Type</th>
              <th scope="col">Categorie</th>
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
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
                <td>
                  <i
                    className="fa-solid fa-trash btn text-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteMove"
                    onClick={() => setMove(move)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteMove move={move} />
      <DeleteMoves />
      <AddAmount account={accountDoc} />
    </div>
  );
};

export default Dashboard;
