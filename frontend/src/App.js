import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {
  Login,
  Register,
  MarketplaceHeader,
  MarketplaceContent,
  MarketplaceFooter
} from "./components";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <MarketplaceHeader></MarketplaceHeader>

          <Route path="/" exact component={MarketplaceContent}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>

          <MarketplaceFooter></MarketplaceFooter>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
