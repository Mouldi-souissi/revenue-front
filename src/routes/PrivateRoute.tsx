import { Redirect, Route, RouteProps } from "wouter";
import store_user from "../stores/store_user";
import { UserRole } from "../constants";

type PrivateRouteProps = RouteProps & {
  roles: UserRole[];
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const isAuthenticated = store_user((store) => store.isAuthenticated);
  const role = store_user((store) => store.role);

  if (isAuthenticated && props.roles.includes(role)) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
