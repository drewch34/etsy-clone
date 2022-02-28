import { createServer, Model, Response } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      popularSearch: Model,
      product: Model,
    },

    routes() {
      this.namespace = "api";

      this.get("/related-products", (schema, request) => {
        const { searchValue } = request.queryParams;
        const isRelated = new RegExp(`^${searchValue}`, "i");
        const relatedProducts = schema.products.where((product) =>
          isRelated.test(product.title)
        );
        return relatedProducts.models.slice(0, 3);
      });

      this.get("/popular-searches", (schema) => {
        return schema.popularSearches.all().models.slice(0, 4);
      });

      this.get(
        "/estimated-shipping",
        (_, request) => {
          const { productId, sellerId, countryId, postalCode } =
            request.queryParams;

          const estimatedCost = 1766 + parseInt(countryId.replace(/\D/g, ""));

          return { estimatedCost };
        },
        { timing: 2000 }
      );

      this.namespace = "";
      this.passthrough();
    },
    seeds(server) {
      server.create("product", {
        title: "Wall Art",
      });
      server.create("product", {
        title: "Wall Decor",
      });
      server.create("product", {
        title: "Wallet",
      });
      server.create("product", {
        title: "Wallet Woman",
      });
      server.create("product", {
        title: "Wallet Men Personalized",
      });

      server.create("popularSearch", {
        title: "while olivia sleeps art",
      });
      server.create("popularSearch", {
        title: "rabbit handmade doll",
      });
      server.create("popularSearch", {
        title: "horse pendant",
      });
      server.create("popularSearch", {
        title: "pre owned designer handbags",
      });
    },
  });

  return server;
}
// ,
//         {wa: ["wall decor", "wall art", "wallet"]},
//         {wal: ["wall decor", "wall art", "wallet"]},
//         {wall: ["wall decor", "wall art", "wallet"]},
//         {walle: ["walled art", "wallet", "wallet men personalized"]},
//         {wallet: ["wallet", "wallet woman", "wallet men personalized"]}
