import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import AddSpending from "./AddSpending";
import DeleteSpending from "./DeleteSpending";
import EditOut from "./EditOut";

const SpendingAndWins = () => {
  const [modalType, setModalType] = useState("");
  const [outId, setOutId] = useState("");
  const [outDoc, setOutDoc] = useState("");
  const getSpendingAndWins = useStore((state) => state.getSpendingAndWins);
  const out = useStore((state) => state.out);
  const wins = useStore((state) => state.wins);
  const spending = useStore((state) => state.spending);
  const getSites = useStore((state) => state.getSites);
  const sites = useStore((state) => state.sites);

  useEffect(() => {
    if (!out.length) {
      getSpendingAndWins();
    }
    if (!sites.length) {
      getSites();
    }
  }, []);
  return (
    <div>
      <div className="d-flex align-items-center">
        <h3 className="m-0 me-3">Gains</h3>
        <i
          className="fa-solid fa-plus btn btn-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addSpending"
          onClick={() => setModalType("gain")}
        ></i>
      </div>

      <table class="table my-5">
        <thead>
          <tr>
            <th scope="col">Site</th>
            <th scope="col">client/Tél</th>
            <th scope="col">Montant</th>
            <th scope="col">Utilisateur</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wins.map((win) => (
            <tr key={win._id}>
              <td>{win.account}</td>
              <td>{win.description}</td>
              <td>{win.amount}</td>
              <td>{win.user}</td>
              <td>
                <i
                  className="fa-solid fa-gear btn"
                  data-bs-toggle="modal"
                  data-bs-target="#editOut"
                  onClick={() => setOutDoc(win)}
                ></i>
                <i
                  className="fa-solid fa-trash btn text-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteSpending"
                  onClick={() => setOutId(win._id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex align-items-center">
        <h3 className="m-0 me-3">Dépenses</h3>
        <i
          className="fa-solid fa-plus btn btn-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addSpending"
          onClick={() => setModalType("dépense")}
        ></i>
      </div>

      <table class="table my-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Montant</th>
            <th scope="col">Utilisateur</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spending.map((spendingDoc) => (
            <tr key={spendingDoc._id}>
              <td>{spendingDoc.description}</td>
              <td>{spendingDoc.amount}</td>
              <td>{spendingDoc.user}</td>
              <td>
                <i
                  className="fa-solid fa-gear btn"
                  data-bs-toggle="modal"
                  data-bs-target="#editOut"
                  onClick={() => setOutDoc(spendingDoc)}
                ></i>
                <i
                  className="fa-solid fa-trash btn text-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteSpending"
                  onClick={() => setOutId(spendingDoc._id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddSpending modalType={modalType} />
      <DeleteSpending id={outId} />
      <EditOut out={outDoc} />
    </div>
  );
};

export default SpendingAndWins;
