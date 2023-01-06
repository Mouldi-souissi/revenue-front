import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import DeleteMove from "../../DeleteMove";
import AddSpending from "./AddSpending";

const SpendingAndWins = () => {
  const [spendingDoc, setSpendingDoc] = useState("");
  const getSpending = useStore((state) => state.getSpending);
  const spending = useStore((state) => state.spending);
  const isLoading = useStore((state) => state.isLoading);
  const total = spending.reduce((acc, curr) => (acc += Number(curr.amount)), 0);

  useEffect(() => {
    getSpending();
  }, []);
  return (
    <div className="container">
      <div className="d-flex align-items-start">
        <div className="me-3">
          <h3 className="m-0 me-3">Dépenses</h3>
          <h6>
            Total :{" "}
            {total.toLocaleString("fr", {
              style: "currency",
              currency: "TND",
              minimumFractionDigits: 0,
            })}
          </h6>
        </div>
        <i
          className="fa-solid fa-plus btn btn-outline-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addSpending"
        ></i>
      </div>

      <div className="loader_wrapper">
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center ">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spending
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((spendingDoc) => (
                <tr key={spendingDoc._id}>
                  <td>{spendingDoc.description}</td>
                  <td>
                    {Number(spendingDoc.amount).toLocaleString("fr", {
                      style: "currency",
                      currency: "TND",
                      minimumFractionDigits: 0,
                    })}
                  </td>
                  <td>{spendingDoc.user}</td>
                  <td>
                    <i
                      className="fa-solid fa-trash btn text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteMove"
                      onClick={() => setSpendingDoc(spendingDoc)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddSpending />
      <DeleteMove move={spendingDoc} />
    </div>
  );
};

export default SpendingAndWins;
