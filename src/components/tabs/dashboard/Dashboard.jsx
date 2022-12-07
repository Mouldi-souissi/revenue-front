import React from "react";

const Dashboard = () => {
  const general = [
    { title: "Fond de caisse", value: 1500, icon: "fa-user" },
    { title: "Fond Bet 24", value: 1500, icon: "fa-user" },
    { title: "Fond Max bet", value: 1500, icon: "fa-user" },
  ];
  return (
    <div className="row justify-content-center">
      {general.map((doc, i) => (
        <div className="card shadow p-4 col-lg-3 dashboard_card" key={i}>
          <div className="card_title">{doc.title}</div>
          <div className="card_value">{doc.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
