import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import { io } from "socket.io-client";
import useStore from "./store";

const socket = io("https://revenue-api.vercel.app/api");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const addMoveSocket = useStore((state) => state.addMoveSocket);
  const deleteMoveSocket = useStore((state) => state.deleteMoveSocket);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("addedMove", (move) => {
      console.log("move", move);
      if (move) {
        addMoveSocket(move);
      }
    });

    socket.on("deletedMove", (move) => {
      console.log("move", move);
      if (move) {
        deleteMoveSocket(move);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("getMoves");
    };
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={MainPage} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
