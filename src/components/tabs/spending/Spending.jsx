import React, { useEffect, useState } from "react";
import useStore from "../../../store";
import AddSpending from "./AddSpending";
import DeleteSpending from "./DeleteSpending";
import EditOut from "./EditOut";

const SpendingAndWins = () => {
  const [spendingDoc, setSpendingDoc] = useState("");
  const getSpending = useStore((state) => state.getSpending);
  const spending = useStore((state) => state.spending);

  useEffect(() => {
    if (!spending.length) {
      getSpending();
    }
  }, []);
  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <h3 className="m-0 me-3">Dépenses</h3>
        <i
          className="fa-solid fa-plus btn btn-primary p-2"
          data-bs-toggle="modal"
          data-bs-target="#addSpending"
        ></i>
      </div>
      <div class="table-responsive">
        <table className="table my-5">
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
                  {/* <i
                  className="fa-solid fa-gear btn"
                  data-bs-toggle="modal"
                  data-bs-target="#editOut"
                  onClick={() => setSpendingDoc(spendingDoc)}
                ></i> */}
                  <i
                    className="fa-solid fa-trash btn text-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteSpending"
                    onClick={() => setSpendingDoc(spendingDoc)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddSpending />
      <DeleteSpending spendingDoc={spendingDoc} />
      <EditOut spendingDoc={spendingDoc} />
    </div>
  );
};

export default SpendingAndWins;
