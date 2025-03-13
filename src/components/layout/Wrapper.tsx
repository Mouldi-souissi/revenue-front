import { ReactNode } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import store_ui from "../../stores/store_ui";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const isSidebarHidden = store_ui((store) => store.isSidebarHidden);

  return (
    <div className="mainPage">
      <Sidebar />
      <div className={`content ${isSidebarHidden ? "full" : ""}`}>
        <TopBar />
        <div className="container my-3">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
