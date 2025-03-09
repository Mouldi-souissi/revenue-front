import { Redirect, Route, RouteProps } from "wouter";
import store_user from "../stores/store_user";
import { Role } from "../models/User";

type PrivateRouteProps = RouteProps & {
  roles: Role[];
};

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const isAuthenticated = store_user((store) => store.isAuthenticated);
  const role = store_user((store) => store.role);

  if (isAuthenticated && props.roles.includes(role)) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
