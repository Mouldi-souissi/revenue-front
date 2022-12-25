import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import AddWin from "./AddWin";
import DeleteWin from "./DeleteWin";
import EditWin from "./EditWin";

const Wins = () => {
  const [winDoc, setWinDoc] = useState("");
  const getWins = useStore((state) => state.getWins);
  const wins = useStore((state) => state.wins);
  const accounts = useStore((state) => state.accounts);
  const getAccounts = useStore((state) => state.getAccounts);

  useEffect(() => {
    if (!wins.length) {
      getWins();
    }
    if (!accounts.length) {
      getAccounts();
    }
  }, []);
  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <h3 className="m-0 me-3">Gain</h3>
        <i
          className="fa-solid fa-plus btn btn-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addWin"
        ></i>
      </div>
      <div class="table-responsive">
        <table className="table my-5">
          <thead>
            <tr>
              <th scope="col">Compte</th>
              {/* <th scope="col">Client/Tél</th> */}
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wins.map((win) => (
              <tr key={win._id}>
                <td>{win.account}</td>
                {/* <td>{win.description}</td> */}
                <td>
                  {Number(win.amount).toLocaleString("fr", {
                    style: "currency",
                    currency: "TND",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td>{win.user}</td>
                <td>
                  {/* <i
                  className="fa-solid fa-gear btn"
                  data-bs-toggle="modal"
                  data-bs-target="#editWin"
                  onClick={() => setWinDoc(win)}
                ></i> */}
                  <i
                    className="fa-solid fa-trash btn text-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteWin"
                    onClick={() => setWinDoc(win)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddWin />
      <DeleteWin winDoc={winDoc} />
      <EditWin winDoc={winDoc} />
    </div>
  );
};

export default Wins;
