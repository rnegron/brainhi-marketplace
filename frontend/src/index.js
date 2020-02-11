import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { makeServer } from "./mirage";

// Use MirageJS in development, sometimes
if (process.env.NODE_ENV === "mirage") {
  makeServer();
}

ReactDOM.render(<App />, document.getElementById("root"));
