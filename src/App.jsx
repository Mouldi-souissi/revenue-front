import { useEffect } from "react";
import "./App.css";
import PrivateRoute from "./components/other/PrivateRoute";
import { Route, Switch, Redirect } from "wouter";
import store_user from "./stores/store_user";
import useScrollTop from "./hooks/useScrollTop";
import { USER_ROLES } from "./constants";

// pages
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users/Users";
import Login from "./pages/Login";
import Accounts from "./pages/accounts/Accounts";
import Sales from "./pages/sales/Sales";
import Spending from "./pages/spending/Spending";
import Wins from "./pages/wins/Wins";
import Revenue from "./pages/revenue/Revenue";
import History from "./pages/history/History";

function App() {
  const checkAuth = store_user((store) => store.checkAuth);

  useScrollTop();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <Switch>
        {/*private routes*/}
        <PrivateRoute
          path="/"
          component={Dashboard}
          roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}
        />
        <PrivateRoute
          path="/users"
          component={Users}
          roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}
        />
        <PrivateRoute
          path="/accounts"
          component={Accounts}
          roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}
        />
        <PrivateRoute
          path="/sales"
          component={Sales}
          roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}
        />
        <PrivateRoute
          path="/spending"
          component={Spending}
          roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}
        />
        <PrivateRoute
          path="/wins"
          component={Wins}
          roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}
        />
        <PrivateRoute
          path="/revenue"
          component={Revenue}
          roles={[USER_ROLES.ADMIN, USER_ROLES.USER]}
        />
        <PrivateRoute
          path="/history"
          component={History}
          roles={[USER_ROLES.ADMIN]}
        />

        {/*public routes*/}
        <Route path="/login" component={Login} />
        {/*404*/}
        <Route path="*" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
