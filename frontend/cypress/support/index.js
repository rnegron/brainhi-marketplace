import "cypress-jest-adapter";

import "./commands";

Cypress.on("window:before:load", win => {
  win.handleFromCypress = function(request) {
    return fetch(request.url, {
      method: request.method,
      body: request.requestBody
    }).then(async res => {
      const body =
        res.headers.map["content-type"] === "application/json"
          ? await res.json()
          : "";

      return [res.status, res.headers, body];
    });
  };
});
