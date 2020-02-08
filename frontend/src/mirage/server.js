import { Server, Model } from "miragejs";

import { ProviderFactory } from "./factories";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      //   user: Model,
      provider: Model
      //   appointment: Model
    },

    factories: {
      provider: ProviderFactory
      //   appointment: Factory.extend({})
    },

    seeds(server) {
      server.createList("provider", 10);
    },

    routes() {
      this.namespace = "v1";

      this.get("/providers", { timing: 1000 });

      this.get(
        "/providers/search/:term",
        (schema, request) => {
          let term = request.params.term;
          return schema.providers.findBy({ name: term });
        },
        {
          timing: 5000
        }
      );
      this.get("/providers/:id", { timing: 500 });
    }
  });

  return server;
}
