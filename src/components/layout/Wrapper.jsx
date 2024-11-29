import React from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import store_user from "../../stores/store_user";

const Wrapper = (props) => {
  const isSidebarHidden = store_user((store) => store.isSidebarHidden);
  return (
    <div className="mainPage">
      <Sidebar />
      <div className={`content ${isSidebarHidden ? "full" : ""}`}>
        <TopBar />
        <div className="container my-3">{props.children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
