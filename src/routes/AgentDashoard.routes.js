import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import AgentDashboard from "../views/AgentDashboard";
import PrivateRoute from "./PrivateRoutes";
import Electricity from "../pages/services/electricity/Electricity";
import ElectricityPayment from "../pages/services/electricity/electricityPayment/ElectricityPayament";
import Cbhi from "../pages/services/cbhi/Cbhi";
import CbhiPayment from "../pages/services/cbhi/cbhiPayment/CbhiPayment";
import CbhiDisplayDetails from "../pages/services/cbhi/cbhiDisplayDetails/CbhiDisplayDetails";
import ElectricityDisplayDetails from "../pages/services/electricity/electricityDisplayDetails/ElectricityDisplayDetails";
import Rra from "../pages/services/rra/Rra";
import RraPayment from "../pages/services/rra/rraPayment/RraPayment";
import RraDisplayDetails from "../pages/services/rra/rraDisplayDetails/RraDisplayDetails";
import ChangePin from "../pages/changepin/ChangePin";
import Ltss from "../pages/services/ltss/Ltss";
import LtssPayment from "../pages/services/ltss/ltssPayment/LtssPayment"
import {useEffect} from "react";
import jwt from "jsonwebtoken";
import { useHistory } from 'react-router-dom';
import Client from "../pages/services/client/Client";
import Rnit from "../pages/services/rnit/Rnit";
import RnitPayment from "../pages/services/rnit/rnitPayment/RnitPayment";
import RnitDisplayDetails from "../pages/services/rnit/rnitDisplayDetails/RnitDisplayDetails";
import Cashin from "../pages/services/client/cashin/Cashin"
import ClientEnrollment from "../pages/clientenrollment/ClientEnrollment";
import CashinDisplayDetails from "../pages/services/client/cashinDisplayDetails/CashinDisplayDetails"
import Profile from "../pages/profile/Profile"

function App() {
  const { path } = useRouteMatch();
  const decode=(token) => {
    const JWT_SECRET="tokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
     return payload;
  }
  const handleCloseWindows=()=>{
  localStorage.removeItem('mobicashAuth');
  }
  const history= useHistory();
  useEffect(() => {
  //  window.addEventListener('beforeunload', handleCloseWindows);
    const token =sessionStorage.getItem('mobicash-auth');
    if (token) {
    const {exp}=decode(token);
    if(Date.now()>=exp*1000){
      localStorage.removeItem("mobicashAuth")
      sessionStorage.removeItem("mobicash-auth")
    
     return history.push('/', { push: true })
    }
    else{
      return null
    }
  }
  return history.push('/', { push: true })
  }, [history]);
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
              path={`${path}/profile`}
              component={Profile}
            />
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
              path={`${path}/electricity-payment-details`}
              component={ElectricityDisplayDetails}
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
                component={CbhiPayment}
              />
            </>
          )}
        />
         <Route
          component={({ match }) => (
            <>
              <PrivateRoute
                exact
                path={`${path}/cbhi-payment-details`}
                component={CbhiDisplayDetails}
              />
            </>
          )}
        />
         <Route
          component={({ match }) => (
            <>
              <PrivateRoute
                exact
                path={`${path}/rra`}
                component={Rra}
              />
            </>
          )}
        />
         <Route
          component={({ match }) => (
            <>
              <PrivateRoute
                exact
                path={`${path}/rra-payment`}
                component={RraPayment}
              />
            </>
          )}
        />
       
         <Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/rra-payment-details`}
              component={RraDisplayDetails}
            />
          </>
        )}
      />
       <Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/change-pin`}
              component={ChangePin}
            />
          </>
        )}
      />
       <Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/ltss`}
              component={Ltss}
            />
          </>
        )}
      />
      <Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/ltss-payment`}
              component={LtssPayment}
            />
          </>
        )}
      />

<Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/client`}
              component={Client}
            />
          </>
        )}
      />
      
<Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/client-cashin`}
              component={Cashin}
            />
          </>
        )}
      />
      <Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/client-cashin-details`}
              component={CashinDisplayDetails}
            />
          </>
        )}
      />
       
      <Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/client/enrollment`}
              component={ClientEnrollment}
            />
          </>
        )}
      />
      <Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/rnit`}
              component={Rnit}
            />
          </>
        )}
      />
      <Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/rnit-payment`}
              component={RnitPayment}
            />
          </>
        )}
      />
       <Route
        component={({ match }) => (
          <>
            <PrivateRoute
              exact
              path={`${path}/rnit-payment-details`}
              component={RnitDisplayDetails}
            />
          </>
        )}
      />
      </AgentDashboard>
    </Switch>
  );
}

export default App;
