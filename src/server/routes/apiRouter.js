const apiRouter = require("express").Router();
import user from "../controllers/UserController";
import authJWT from "../middlewares/authJWT";
import NotFound from "../Response/NotFound";
import InternalServerError from "../Response/InternalServerError";
//========= User =========
apiRouter.get("/me", authJWT, user.me);
apiRouter.post("/user", user.creatUser);

// ========= Override status for api =====
// eslint-disable-next-line no-unused-vars
apiRouter.use((req, res, next) => {
  new NotFound(res).send();
});

// Error-handling middleware always takes four arguments : https://expressjs.com/en/guide/using-middleware.html
// eslint-disable-next-line no-unused-vars
apiRouter.use((err, req, res, next) => {
  console.log("SERVER ERROR", err);

  new InternalServerError(res).send();
});

module.exports = apiRouter;
