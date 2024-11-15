import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import DeleteMove from "../../DeleteMove";
import AddWin from "./AddWin";

const Wins = () => {
  const [winDoc, setWinDoc] = useState("");
  const getWins = useStore((state) => state.getWins);
  const wins = useStore((state) => state.wins);
  const getAccounts = useStore((state) => state.getAccounts);
  const isLoading = useStore((state) => state.isLoading);
  const total = wins.reduce((acc, curr) => (acc += Number(curr.amount)), 0);

  useEffect(() => {
    getWins();
    getAccounts();
  }, []);

  const username = useStore((state) => state.username);
  const userType = useStore((state) => state.userType);

  const checkUser = (user) => {
    if (userType === "admin") {
      return true;
    } else {
      if (username === user) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <div className="container">
      {isLoading && (
        <div className="d-flex align-items-center justify-content-center ">
          <div className="loader"></div>
        </div>
      )}

      <div className="tableCard d-flex align-items-start justify-content-between gap-2 p-3">
        <div className="">
          <div className="title">Gain</div>
          <div className="mt-3">
            <div className="d-flex gap-2">
              <div>Total:</div>
              <div>
                {total.toLocaleString("fr", {
                  style: "currency",
                  currency: "TND",
                  minimumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>
        </div>
        <button
          data-bs-toggle="modal"
          data-bs-target="#addWin"
          className="button primary sm"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table>
          <thead>
            <tr>
              <th scope="col">Compte</th>
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wins
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((win) => (
                <tr key={win._id}>
                  <td>{win.account}</td>
                  <td>
                    {Number(win.amount).toLocaleString("fr", {
                      style: "currency",
                      currency: "TND",
                      minimumFractionDigits: 0,
                    })}
                  </td>
                  <td>{win.user}</td>
                  <td>
                    {new Date(win.date).toLocaleString("fr", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>
                    {checkUser(win.user) && (
                      <i
                        className="fa-solid fa-trash btn text-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteMove"
                        onClick={() => setWinDoc(win)}
                      ></i>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AddWin />
      <DeleteMove move={winDoc} />
    </div>
  );
};

export default Wins;
