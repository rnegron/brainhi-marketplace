import { Server, Model, RestSerializer } from "miragejs";

import { ProviderFactory } from "./factories";

import uuidIdentityManager from "./uuid";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    serializers: {
      application: RestSerializer
    },

    identityManagers: [uuidIdentityManager],

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

      this.get(
        "/providers",
        function(schema, request) {
          let providers = schema.providers.all();
          let json = this.serialize(providers);

          return { results: json.providers };
        },
        { timing: 1000 }
      );

      this.get(
        "/providers/search/:term",
        function(schema, request) {
          let term = request.params.term;
          let provider = schema.providers.findBy({ name: term });

          let json = this.serialize(provider);

          return { results: [json.provider] };
        },
        {
          timing: 5000
        }
      );
      this.get(
        "/providers/:id",
        function(schema, request) {
          let id = request.params.id;
          let provider = schema.providers.find(id);
          let json = this.serialize(provider);

          return { results: json.provider };
        },
        { timing: 500 }
      );
    }
  });

  return server;
}
