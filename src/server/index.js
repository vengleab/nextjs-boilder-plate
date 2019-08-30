const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require("cors");

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  dir: "src/client",
  assetPrefix: dev ? "https://cdn.mydomain.com" : ""
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(morgan("dev"));
  const env = require("../../config/env");

  server.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.use(routes);

  server.listen(env.PORT, () => {
    console.log(`listening to port ${env.PORT}`);
  });
});

process.on("exit", code => {
  console.log(`About to exit with code: ${code}`);
});
