import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import AgentDashboard from "../views/AgentDashboard";
import PrivateRoute from "./PrivateRoutes";
import Snippets from "../pages/snippets/Snippets";
import Electricity from "../pages/services/electricity/Electricity";
import ElectricityPayment from "../pages/services/electricity/electricityPayment/ElectricityPayament";
import Cbhi from "../pages/services/cbhi/Cbhi";


function App() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <AgentDashboard>
        <Route
          component={({ match }) => (
            <>
              <PrivateRoute exact path={path} component={Home} />
            </>
          )}
        />
        <Route
          component={({ match }) => (
            <>
              <PrivateRoute
                exact
                path={`${path}/electricity`}
                component={Electricity}
              />
            </>
          )}
        />
        <Route
          component={({ match }) => (
            <>
              <PrivateRoute
                exact
                path={`${path}/electricity-payment`}
                component={ElectricityPayment}
              />
            </>
          )}
        />
         <Route
          component={({ match }) => (
            <>
              <PrivateRoute
                exact
                path={`${path}/cbhi`}
                component={Cbhi}
              />
            </>
          )}
        />
         <Route
          component={({ match }) => (
            <>
              <PrivateRoute
                exact
                path={`${path}/cbhi-payment`}
                component={ElectricityPayment}
              />
            </>
          )}
        />
      </AgentDashboard>
    </Switch>
  );
}

export default App;
