import store_user from "../../stores/store_user";
import { Link } from "wouter";
import IconSVG from "../UI/IconSVG";
import { getIconColor } from "../../helpers/getIconColor";

const Sidebar = () => {
  const isSidebarHidden = store_user((state) => state.isSidebarHidden);
  const switchTab = store_user((state) => state.switchTab);
  const activeTab = store_user((state) => state.activeTab);
  const routes = store_user((state) => state.routes);
  const shop = store_user((state) => state.shop);

  return (
    <div className={`sidebar ${isSidebarHidden ? "hidden" : ""}`}>
      <div className="text-white fs-3 m-3 appTitle">
        Caisse <span className="small">{shop}</span>
      </div>

      <ul>
        {routes.map((route, i) => (
          <li key={i}>
            <Link
              className={`navlink ${activeTab === route.link ? "active" : ""}`}
              onClick={() => switchTab(route.link)}
              to={route.link}
            >
              <span className="icon">
                <IconSVG
                  name={route.icon}
                  size={24}
                  color={getIconColor("sidebar")}
                />
              </span>
              <span className="item">{route.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
