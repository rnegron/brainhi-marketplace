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
      provider: Model
    },

    factories: {
      provider: ProviderFactory
    },

    seeds(server) {
      server.createList("provider", 25);
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
          timing: 2000
        }
      );

      this.get(
        "/providers/:id",
        function(schema, request) {
          let id = request.params.id;
          let provider = schema.providers.find(id);
          let json = this.serialize(provider);

          return json.provider;
        },
        { timing: 500 }
      );

      this.post(
        "/providers/:id/appointment",
        function(schema, request) {
          let data = JSON.parse(request.requestBody);
          return schema.appointments.create(data);
        }
      )
    }
  });

  return server;
}
