import React from "react";
import { Route } from "react-router-dom";
import {
  Login,
  Register,
  MarketplaceHeader,
} from "./components";

class UnauthenticatedApp extends React.Component {
  render() {
    return (
      <div>
        <MarketplaceHeader loggedIn={false}></MarketplaceHeader>

        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
      </div>
    );
  }
}

export default UnauthenticatedApp;
