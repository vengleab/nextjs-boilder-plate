const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("../../config/env");
mongoose.connect(env.DB_URL, { useNewUrlParser: true });

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan("dev"));

server.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

server.use(routes);

if (process.env.DEV_SERVER) {
  startServer();
} else {
  const configNext = require("../../config/next").default;
  configNext({ server }).then(startServer);
}

function startServer() {
  server.listen(env.PORT, () => {
    console.log(`listening to port ${env.PORT}`);
  });

  process.on("exit", code => {
    console.log(`About to exit with code: ${code}`);
  });
}
