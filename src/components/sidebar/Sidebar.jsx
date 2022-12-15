import React, { useEffect } from "react";
import userIcon from "../../assets/user.svg";
import useStore from "../../store";

const Sidebar = () => {
  const isSidebarHidden = useStore((state) => state.isSidebarHidden);
  const switchTab = useStore((state) => state.switchTab);
  const activeTab = useStore((state) => state.activeTab);
  const username = useStore((state) => state.username);
  useEffect(() => {
    console.log(username);
  }, []);

  return (
    <div className={`sidebar ${isSidebarHidden ? "hidden" : ""}`}>
      <div className="profile mb-4">
        <img src={userIcon} alt="profile_picture" className="img-fluid" />
        <h5 className="text-center text-white">{username}</h5>
      </div>
      <ul>
        <li>
          <div
            className={`navlink ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => switchTab("dashboard")}
          >
            <span className="icon">
              <i className="fas fa-desktop"></i>
            </span>
            <span className="item">Tableau de bord</span>
          </div>
        </li>

        <li>
          <div
            className={`navlink ${activeTab === "users" ? "active" : ""}`}
            onClick={() => switchTab("users")}
          >
            <span className="icon">
              <i className="fas fa-user-friends"></i>
            </span>
            <span className="item">Utilisateurs</span>
          </div>
        </li>

        <li>
          <div
            className={`navlink ${activeTab === "sites" ? "active" : ""}`}
            onClick={() => switchTab("sites")}
          >
            <span className="icon">
              <i className="fa-solid fa-tablet-screen-button"></i>
            </span>
            <span className="item">Sites</span>
          </div>
        </li>
        <li>
          <div className={`navlink ${activeTab === "sales" ? "active" : ""}`}>
            <span className="icon">
              <i className="fa-solid fa-up-long green"></i>
            </span>
            <span className="item">Ventes</span>
          </div>
        </li>
        <li>
          <div
            className={`navlink ${
              activeTab === "spendingAndWins" ? "active" : ""
            }`}
            onClick={() => switchTab("spendingAndWins")}
          >
            <span className="icon">
              <i className="fa-solid fa-down-long red"></i>
            </span>
            <span className="item">Dépenses et gains</span>
          </div>
        </li>

        <li>
          <div
            className={`navlink ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => switchTab("calculator")}
          >
            <span className="icon">
              <i className="fas fa-chart-line"></i>
            </span>
            <span className="item">Reports</span>
          </div>
        </li>
        {/* <li>
          <div
            className={`navlink ${activeTab === "settings" ? "active" : ""}`}
          >
            <span className="icon">
              <i className="fas fa-cog"></i>
            </span>
            <span className="item">Settings</span>
          </div>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
