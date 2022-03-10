import { Route, Switch } from "react-router-dom";
import AppHome from "features/AppHome/AppHome";
const RoutesPath = () => {
  const routePaths = [
    {
      name: "appHome",
      path: "/",
      exact: false,
      component: AppHome,
    },
  ];
  return (
    <Switch>
      {routePaths.map((item) => (
        <Route
          exact={item.exact}
          component={item.component}
          path={item.path}
          key={item.name}
        ></Route>
      ))}
    </Switch>
  );
};
export default RoutesPath;
