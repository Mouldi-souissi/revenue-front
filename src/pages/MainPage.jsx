import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Dashboard from "../components/tabs/dashboard/Dashboard";
import Users from "../components/tabs/users/Users";
import Accounts from "../components/tabs/accounts/Accounts";
import useStore from "../store";
import Spending from "../components/tabs/spending/Spending";
import Wins from "../components/tabs/wins/Wins";
import Sales from "../components/tabs/sales/Sales";
import userIcon from "/user.svg";

const MainPage = () => {
  const toggleSideBar = useStore((state) => state.toggleSideBar);
  const isSidebarHidden = useStore((state) => state.isSidebarHidden);
  const activeTab = useStore((state) => state.activeTab);
  const logout = useStore((state) => state.logout);
  const checkAuth = useStore((state) => state.checkAuth);
  const username = useStore((state) => state.username);

  const handleTabs = () => {
    if (activeTab === "dashboard") {
      return <Dashboard />;
    }
    if (activeTab === "users") {
      return <Users />;
    }
    if (activeTab === "accounts") {
      return <Accounts />;
    }
    if (activeTab === "spending") {
      return <Spending />;
    }
    if (activeTab === "wins") {
      return <Wins />;
    }
    if (activeTab === "sales") {
      return <Sales />;
    }
  };
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="mainPage">
      <Sidebar />
      <div className={`content ${isSidebarHidden ? "full" : ""}`}>
        <div className="topBar">
          <div className="d-flex gap-2 align-items-center">
            <img src={userIcon} alt="user icon" className="user-icon" />
            <div>{username}</div>
          </div>
          <div className="d-flex align-items-center">
            <button className="button sm transparent" onClick={toggleSideBar}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <button className="button sm transparent" onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
        <div className="container my-3">{handleTabs()}</div>
      </div>
    </div>
  );
};

export default MainPage;
