import { Redirect, Route } from "wouter";
import store_user from "../stores/store_user";

const PrivateRoute = (props) => {
  const isAuthenticated = store_user((store) => store.isAuthenticated);
  const role = store_user((store) => store.role);

  if (isAuthenticated && props.roles.includes(role)) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
