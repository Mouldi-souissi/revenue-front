import { useEffect } from "react";
import "./App.css";
import Router from "./routes/Router";
import store_user from "./stores/store_user";
import useScrollTop from "./hooks/useScrollTop";
import "notyf/notyf.min.css";

function App() {
  const checkAuth = store_user((store) => store.checkAuth);

  useScrollTop();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
