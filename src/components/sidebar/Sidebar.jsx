import "./sidebar.css";
import React, { useState } from "react";
import Dashboard from "../tabs/dashboard/Dashboard";
import Sites from "../tabs/sites/Sites";
import Calculator from "../tabs/calculator/Calculator";
import userIcon from "../../assets/user.svg";
import useStore from "../../store";

const Sidebar = () => {
  const isSidebarHidden = useStore((state) => state.isSidebarHidden);
  const switchTab = useStore((state) => state.switchTab);
  const activeTab = useStore((state) => state.activeTab);

  const tabs = [
    {
      title: "dashboard",
      content: "",
    },
  ];

  const handleTabs = (tabs) => {
    if (activeTab === "dashboard") {
      return <Dashboard />;
    }
    if (activeTab === "sites") {
      return <Sites />;
    }
    if (activeTab === "calculator") {
      return <Calculator />;
    }
  };

  return (
    // <div className="dashboard">
    //   <div className="navbarTop">
    //     <i
    //       className="fa-solid fa-bars"
    //       onClick={() => toggleSideBar(!sideBar)}
    //     ></i>
    //     <div className="h1">Caisse</div>
    //     <div className="d-flex align-items-center gap-2">
    //       <div>EXIT</div>
    //       <i className="fa-solid fa-door-closed"></i>
    //     </div>
    //   </div>
    //   <div className="d-flex">
    //     <div className={`sidebar  ${sideBar ? "active" : "hidden"}`}>
    //       <div className="navlinks">
    //         <div
    //           className={`navlink ${activeTab === "dashboard" ? "active" : ""}`}
    //           onClick={() => setActiveTab("dashboard")}
    //         >
    //           <i className="fa-solid fa-chart-line"></i>
    //           <div className="navlink_text">Dashboard</div>
    //         </div>
    //         <div
    //           className={`navlink ${activeTab === "sites" ? "active" : ""}`}
    //           onClick={() => setActiveTab("sites")}
    //         >
    //           <i className="fa-solid fa-tablet-screen-button"></i>
    //           <div className="navlink_text">Sites</div>
    //         </div>
    //         <div
    //           className={`navlink ${activeTab === "users" ? "active" : ""}`}
    //           onClick={() => setActiveTab("users")}
    //         >
    //           <i className="fa-solid fa-user"></i>
    //           <div className="navlink_text">Users</div>
    //         </div>
    //         <div
    //           className={`navlink ${
    //             activeTab === "calculator" ? "active" : ""
    //           }`}
    //           onClick={() => setActiveTab("calculator")}
    //         >
    //           <i className="fa-solid fa-calculator"></i>
    //           <div className="navlink_text">Recette</div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className={`content  ${!sideBar ? "full" : ""}`}>
    //       <div className="container p-3">{handleTabs(tabs)}</div>
    //     </div>
    //   </div>
    // </div>
    <div className="wrapper">
      <div className={`sidebar ${isSidebarHidden ? "hidden" : ""}`}>
        <div className="profile mb-4">
          <img src={userIcon} alt="profile_picture" className="img-fluid" />
          <h5 className="text-center text-white">Haythem</h5>
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
              <span className="item">My Dashboard</span>
            </div>
          </li>

          <li>
            <div
              className={`navlink ${activeTab === "sites" ? "active" : ""}`}
              onClick={() => switchTab("sites")}
            >
              <span className="icon">
                <i className="fas fa-user-friends"></i>
              </span>
              <span className="item">People</span>
            </div>
          </li>

          <li>
            <div
              className={`navlink ${
                activeTab === "calculator" ? "active" : ""
              }`}
              onClick={() => switchTab("calculator")}
            >
              <span className="icon">
                <i className="fas fa-chart-line"></i>
              </span>
              <span className="item">Reports</span>
            </div>
          </li>
          <li>
            <div className={`navlink ${activeTab === "admin" ? "active" : ""}`}>
              <span className="icon">
                <i className="fas fa-user-shield"></i>
              </span>
              <span className="item">Admin</span>
            </div>
          </li>
          <li>
            <div
              className={`navlink ${activeTab === "settings" ? "active" : ""}`}
            >
              <span className="icon">
                <i className="fas fa-cog"></i>
              </span>
              <span className="item">Settings</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
