import React, { useEffect } from "react";
import useStore from "../../../store";

const Dashboard = () => {
  const addAccount = useStore((state) => state.addAccount);
  const getAccounts = useStore((state) => state.getAccounts);
  const accounts = useStore((state) => state.accounts);

  useEffect(() => {
    // if (!accounts.length) {
    getAccounts();
    // }
  }, []);

  const handleAdd = () => {
    const acc = [
      { name: "Cbet", deposit: 900, previousDeposit: 0 },
      { name: "Maxbet", deposit: 750, previousDeposit: 0 },
      { name: "Fond", deposit: 1000, previousDeposit: 0 },
    ];

    acc.forEach((a) => {
      addAccount(a);
    });
  };

  return (
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
      {/* <button className="btn btn-primary" onClick={handleAdd}>test</button> */}
    </div>
  );
};

export default Dashboard;
