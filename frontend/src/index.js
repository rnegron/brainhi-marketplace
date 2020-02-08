import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { makeServer } from "./mirage";

// Use MirageJS in development
if (process.env.NODE_ENV === "development") {
  makeServer();
}

ReactDOM.render(<App />, document.getElementById("root"));
