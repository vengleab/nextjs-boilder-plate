const apiRouter = require("express").Router();
import userController from "../controllers/userController";
import authJWT from "../middlewares/authJWT";
import NotFound from "../Response/NotFound";
import InternalServerError from "../Response/InternalServerError";
import auhtController from "../controllers/authController";

apiRouter.get("/me", authJWT, userController.me);
apiRouter.post("/user", userController.creatUser);
apiRouter.post("/login", auhtController.login);

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
