import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Server, Response } from "miragejs";
import { makeServer } from "./mirage";

// Use MirageJS in development
if (process.env.REACT_APP_MIRAGE) {
  makeServer();
}

// Use MirageJS and Cypress together
if (window.Cypress) {
  makeServer();

  // mirage cypress server
  new Server({
    environment: "test",
    routes() {
      let methods = ["get", "put", "patch", "post", "delete"];
      methods.forEach(method => {
        this[method]("/*", async (schema, request) => {
          return new Response(...(await window.handleFromCypress(request)));
        });
      });
    }
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
