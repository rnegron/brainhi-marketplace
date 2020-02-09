import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Login,
  Register,
  MarketplaceHeader,
  MarketplaceContent,
  MarketplaceFooter,
  ProviderDetails,
  ScrollToTop,
  ProviderAppointment
} from "./components";

// From: https://kentcdodds.com/blog/authentication-in-react-applications
// import { useUser } from "./context/auth";
// const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
// const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <ScrollToTop />
          <MarketplaceHeader></MarketplaceHeader>

          <Switch>
            <Route exact path="/">
              <MarketplaceContent />
            </Route>

            <Route exact path="/providers">
              <MarketplaceContent />
            </Route>

            <Route exact path="/providers/:id">
              <ProviderDetails />
            </Route>

            <Route exact path="/providers/:id/appointment">
              <ProviderAppointment />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>
          </Switch>

          <MarketplaceFooter></MarketplaceFooter>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
