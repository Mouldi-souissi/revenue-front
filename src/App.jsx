import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Calculator from "./components/tabs/calculator/Calculator";
import Dashboard from "./components/tabs/dashboard/Dashboard";
import Sites from "./components/tabs/sites/Sites";
import useStore from "./store";

function App() {
  const toggleSideBar = useStore((state) => state.toggleSideBar);
  const activeTab = useStore((state) => state.activeTab);

  const handleTabs = () => {
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
    <div className="App">
      <Sidebar />
      <div className="content">
        <div className="topBar">
          <i className="fa-solid fa-bars btn" onClick={toggleSideBar}></i>
        </div>
        <div className="container">{handleTabs()}</div>
      </div>
    </div>
  );
}

export default App;
