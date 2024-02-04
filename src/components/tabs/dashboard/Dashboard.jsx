import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import DeleteMove from "../../DeleteMove";
import Pagination from "../../Pagination";
import AddAmount from "./AddAmount";
import DeleteMoves from "./DeleteMoves";
import WithDraw from "./WithDraw";

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

  const getUsers = useStore((state) => state.getUsers);
  const shop = useStore((state) => state.shop);
  const users = useStore((state) => state.users).filter(
    (user) => user.shop === shop
  );
  const [userFilter, setUserFilter] = useState("all");

  const calulateStats = (type, userFilter) => {
    let total = 0;
    if (userFilter !== "all") {
      if (type === "recette") {
        for (let move of moves) {
          if (
            move.type === "entrée" &&
            move.subType !== "versement" &&
            move["user"] === userFilter
          ) {
            total += Number(move.amount);
          }
          if (
            move.type === "sortie" &&
            move["user"] === userFilter &&
            move.subType !== "retrait"
          ) {
            total -= Number(move.amount);
          }
        }
      }
      if (type === "gain") {
        total = moves
          .filter(
            (move) => move.subType === "gain" && move["user"] === userFilter
          )
          .reduce((acc, curr) => (acc += Number(curr.amount)), 0);
      }
      if (type === "spending") {
        total = moves
          .filter(
            (move) => move.subType === "dépense" && move["user"] === userFilter
          )
          .reduce((acc, curr) => (acc += Number(curr.amount)), 0);
      }
      if (type === "vente") {
        total = moves
          .filter(
            (move) => move.subType === "vente" && move["user"] === userFilter
          )
          .reduce((acc, curr) => (acc += Number(curr.amount)), 0);
      }
    } else {
      if (type === "recette") {
        for (let move of moves) {
          if (move.type === "entrée" && move.subType !== "versement") {
            total += Number(move.amount);
          }
          if (move.type === "sortie" && move.subType !== "retrait") {
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
    }

    return total.toFixed(0);
  };

  const recette = calulateStats("recette", userFilter);
  const gain = calulateStats("gain", userFilter);
  const spending = calulateStats("spending", userFilter);
  const vente = calulateStats("vente", userFilter);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let filteredMoves = [];

  if (userFilter === "all") {
    filteredMoves = moves;
  } else {
    filteredMoves = moves.filter((m) => m.user === userFilter);
  }
  let currentMoves = filteredMoves.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = (pageNumbers) => {
    if (currentPage + 1 <= pageNumbers[pageNumbers.length - 1]) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = (pageNumbers) => {
    if (currentPage - 1 >= pageNumbers[0]) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (userType === "admin") {
      getAccounts();
    }
    getMoves();
    getUsers();
  }, [userType]);

  const handlePeriod = (e) => {
    const selected = e.target.value;
    setPeriod(selected);
    getMoves(selected);
  };

  return (
    <div className="container">
      <div className="dashboard_cards">
        {userType === "admin" &&
          accounts.map((account) => (
            <div className="dashboard_card" key={account._id}>
              <div className="d-flex justify-content-between align-items-start w-100">
                <div className="card_title">{account.name}</div>
                <div>
                  {account.name === "Fond" && (
                    <i
                      className="fa-solid fa-minus btn addDeposit"
                      data-bs-toggle="modal"
                      data-bs-target="#withdraw"
                    />
                  )}
                  <i
                    className="fa-solid fa-plus btn addDeposit"
                    data-bs-toggle="modal"
                    data-bs-target="#addAmount"
                    onClick={() => setAccountDoc(account)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between w-100 align-items-start">
                <div>
                  <i className="fa-solid fa-landmark mt-2"></i>
                </div>
                <div>
                  <div className="card_value">
                    {Number(account.deposit).toLocaleString("fr", {
                      style: "currency",
                      currency: "TND",
                      minimumFractionDigits: 0,
                    })}
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="text-white small">
                      Dernière opération :{" "}
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
        <div className="d-flex align-items-center justify-content-center ">
          <div className="loader"></div>
        </div>
      )}

      <div className="d-flex align-items-center justify-content-center flex-wrap my-5">
        <h5 className="me-5 ">Les movements</h5>
        <div className="d-flex gap-3">
          <div className="input-group">
            <span className="input-group-text">Période</span>
            <select
              className="form-select"
              style={{ maxWidth: "250px" }}
              value={period}
              onChange={handlePeriod}
            >
              <option value="daily">Aujourd'hui</option>
              <option value="yesterday">Hier</option>
              <option value="weekly">Cette semaine</option>
              <option value="monthly">Ce mois</option>
            </select>
          </div>
          <div className="input-group">
            <span className="input-group-text">Utilisateur</span>
            <select
              className="form-select col-lg-6"
              style={{ maxWidth: "250px" }}
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            >
              <option value="all">Tous</option>
              {users.map((user) => (
                <option value={user.name} key={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {/* <i
            className="fa-solid fa-trash btn text-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteAllMoves"
          ></i> */}
        </div>
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
              {userType === "admin" && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentMoves.map((move) => (
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
                {userType === "admin" && (
                  <td>
                    <i
                      className="fa-solid fa-trash btn text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteMove"
                      onClick={() => setMove(move)}
                    ></i>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex align-items-center justify-content-center mb-5">
          <Pagination
            className="pt-5"
            postsPerPage={postsPerPage}
            totalMoves={filteredMoves.length}
            paginate={paginate}
            nextPage={nextPage}
            previousPage={previousPage}
            currentPage={currentPage}
          />
        </div>
      </div>

      <DeleteMove move={move} />
      <DeleteMoves />
      <AddAmount account={accountDoc} />
      <WithDraw />
    </div>
  );
};

export default Dashboard;
