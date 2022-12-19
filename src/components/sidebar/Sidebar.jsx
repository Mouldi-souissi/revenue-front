import React from "react";
import userIcon from "../../assets/user.svg";
import useStore from "../../store";

const Sidebar = () => {
  const isSidebarHidden = useStore((state) => state.isSidebarHidden);
  const switchTab = useStore((state) => state.switchTab);
  const activeTab = useStore((state) => state.activeTab);
  const username = useStore((state) => state.username);
  const userType = useStore((state) => state.userType);
  const adminRoutes = useStore((state) => state.adminRoutes);
  const userRoutes = useStore((state) => state.userRoutes);

  return (
    <div className={`sidebar ${isSidebarHidden ? "hidden" : ""}`}>
      <div className="profile mb-4">
        <img src={userIcon} alt="profile_picture" className="img-fluid" />
        <h5 className="text-center text-white">{username}</h5>
      </div>
      <ul>
        {userType === "admin" &&
          adminRoutes.map((route, i) => (
            <li key={i}>
              <div
                className={`navlink ${
                  activeTab === route.link ? "active" : ""
                }`}
                onClick={() => switchTab(route.link)}
              >
                <span className="icon">
                  <i className={route.icon}></i>
                </span>
                <span className="item">{route.text}</span>
              </div>
            </li>
          ))}
        {userType === "utilisateur" &&
          userRoutes.map((route, i) => (
            <li key={i}>
              <div
                className={`navlink ${
                  activeTab === route.link ? "active" : ""
                }`}
                onClick={() => switchTab(route.link)}
              >
                <span className="icon">
                  <i className={route.icon}></i>
                </span>
                <span className="item">{route.text}</span>
              </div>
            </li>
          ))}

        {/* <li>
          <div
            className={`navlink ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => switchTab("calculator")}
          >
            <span className="icon">
              <i className="fas fa-chart-line"></i>
            </span>
            <span className="item">Reports</span>
          </div>
        </li> */}
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
