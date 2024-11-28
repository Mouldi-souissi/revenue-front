import { useEffect } from "react";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Switch, Redirect } from "wouter";
import store_user from "./stores/store_user";

// pages
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import Login from "./pages/Login";
import Accounts from "./pages/accounts/Accounts";
import Sales from "./pages/sales/Sales";
import Spending from "./pages/spending/Spending";
import Wins from "./pages/wins/Wins";

function App() {
  const checkAuth = store_user((store) => store.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <Switch>
        {/*private routes*/}
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          roles={["admin", "user"]}
        />
        <PrivateRoute
          path="/users"
          component={Users}
          roles={["admin", "user"]}
        />
        <PrivateRoute
          path="/accounts"
          component={Accounts}
          roles={["admin", "user"]}
        />
        <PrivateRoute
          path="/sales"
          component={Sales}
          roles={["admin", "user"]}
        />
        <PrivateRoute
          path="/spending"
          component={Spending}
          roles={["admin", "user"]}
        />
        <PrivateRoute path="/wins" component={Wins} roles={["admin", "user"]} />
        {/*public routes*/}
        <Route path="/login" component={Login} />
        {/*404*/}
        <Route path="*" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
