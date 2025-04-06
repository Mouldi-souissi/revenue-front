import store_user from "../../stores/store_user";
import store_ui from "../../stores/store_ui";

import userIcon from "/user.svg";

const TopBar = () => {
  const toggleSideBar = store_ui((state) => state.toggleSideBar);
  const logout = store_user((state) => state.logout);
  const username = store_user((state) => state.username);

  return (
    <div className="topBar">
      <div className="d-flex gap-2 align-items-center">
        <img src={userIcon} alt="user icon" className="user-icon" />
        <div>{username}</div>
      </div>
      <div className="d-flex align-items-center gap-1">
        <button className="button transparent" onClick={toggleSideBar}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <button className="button transparent" onClick={logout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
