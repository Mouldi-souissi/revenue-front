import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Dashboard from "../components/tabs/dashboard/Dashboard";
import Users from "../components/tabs/users/Users";
import Accounts from "../components/tabs/accounts/Accounts";
import useStore from "../store";
import Spending from "../components/tabs/spending/Spending";
import Wins from "../components/tabs/wins/Wins";
import Sales from "../components/tabs/sales/Sales";

const MainPage = () => {
  const toggleSideBar = useStore((state) => state.toggleSideBar);
  const isSidebarHidden = useStore((state) => state.isSidebarHidden);
  const activeTab = useStore((state) => state.activeTab);
  const logout = useStore((state) => state.logout);
  const checkAuth = useStore((state) => state.checkAuth);

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
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-bars btn" onClick={toggleSideBar}></i>
            <i
              className="fa-solid fa-arrow-right-from-bracket btn"
              onClick={handleLogout}
            ></i>
          </div>
        </div>
        <div className="container">{handleTabs()}</div>
      </div>
    </div>
  );
};

export default MainPage;
