import React from "react";

import { MarketplaceHeader } from "./components";

class AuthenticatedApp extends React.Component {
  render() {
    return (
      <div>
        <MarketplaceHeader loggedIn={true}></MarketplaceHeader>
      </div>
    );
  }
}

export default AuthenticatedApp;
