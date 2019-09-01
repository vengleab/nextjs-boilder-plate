const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "src/client",
  assetPrefix: dev ? "https://cdn.mydomain.com" : ""
});
const handle = app.getRequestHandler();

export default async function({ server }) {
  return app.prepare().then(() => {
    server.get("*", (req, res) => {
      return handle(req, res);
    });
  });
}
