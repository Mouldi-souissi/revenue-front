import React from "react";
import userIcon from "/user.svg";
import useStore from "../../store";

const iconsMap = {
  users: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-users-round"
    >
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </svg>
  ),
  dashboard: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-monitor"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  ),
  sales: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-arrow-up"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  ),
  spending: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-arrow-down"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="m8 12 4 4 4-4" />
    </svg>
  ),
  wins: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-coins"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  ),
  accounts: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-wallet"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  ),
};

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
      <div className="text-white fs-3 m-3 appTitle">Caisse</div>

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
                  {/*<i className={route.icon}></i>*/}
                  {iconsMap[route.link]}
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
                  {/*<i className={route.icon}></i>*/}
                  {iconsMap[route.link]}
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
