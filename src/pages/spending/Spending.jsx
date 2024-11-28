import React, { useEffect, useState } from "react";
import useStore from "../../store";
import DeleteMove from "../../components/DeleteMove";
import AddSpending from "./AddSpending";
import Wrapper from "../../components/Wrapper";

const Spending = () => {
  const [spendingDoc, setSpendingDoc] = useState("");
  const getSpending = useStore((state) => state.getSpending);
  const spending = useStore((state) => state.spending);
  const isLoading = useStore((state) => state.isLoading);
  const username = useStore((state) => state.username);
  const userType = useStore((state) => state.userType);
  const total = spending.reduce((acc, curr) => (acc += Number(curr.amount)), 0);

  useEffect(() => {
    getSpending();
  }, []);

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
    <Wrapper>
      <div className="d-flex align-items-start justify-content-between gap-2 p-3">
        <div>
          <div className="d-flex gap-5 align-items-center">
            <div className="title">Dépenses</div>
            {isLoading && <div className="loader"></div>}
          </div>
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
          data-bs-target="#addSpending"
          className="button primary sm"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="table-responsive mt-3">
        <table>
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Montant</th>
              <th scope="col">Utilisateur</th>
              <th scope="col">Date</th>
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
                    {new Date(spendingDoc.date).toLocaleString("fr", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>
                    {checkUser(spendingDoc.user) && (
                      <i
                        className="fa-solid fa-trash btn text-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteMove"
                        onClick={() => setSpendingDoc(spendingDoc)}
                      ></i>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AddSpending />
      <DeleteMove move={spendingDoc} />
    </Wrapper>
  );
};

export default Spending;
