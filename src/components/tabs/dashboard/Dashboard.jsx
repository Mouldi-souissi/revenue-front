import "./dashboard_styles.css";
import React from "react";

const Dashboard = () => {
  const general = [
    { title: "Fond de caisse", value: 1500, icon: "fa-solid fa-landmark" },
    { title: "Fond Bet 24", value: 900, icon: "fa-solid fa-landmark" },
    { title: "Fond Max bet", value: 750, icon: "fa-solid fa-landmark" },
  ];
  return (
    <div className="dashboard_cards">
      {general.map((doc, i) => (
        <div className="dashboard_card" key={i}>
          <div className="card_title">{doc.title}</div>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <i className={doc.icon}></i>
            <div className="card_value">{doc.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
