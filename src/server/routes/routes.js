const router = require("express").Router();
import home from "../controllers/HomeController";
import auth from "../controllers/AuthController";
import user from "../controllers/UserController";
import authUser from "../middlewares/authUser";
import authJWT from "../middlewares/authJWT";

//render view
router.get("/", home.index);

//API Route
router.get("/api/v1");

router.post("/login", auth.login);

//========= User =========
router.get("/user", userRoute => {
  userRoute.get("/me", authJWT, user.me);
  userRoute.post("/", user.creatUser);
});

router.use((req, res, next) => {
  res.status(404).send({
    message: "Not found",
    code: 404
  });
});

router.use((err, req, res, next) => {
  console.log("SERVER ERROR", err);

  res.status(500).send({
    message: "Internal Server Error",
    code: 500
  });
});

//Eoror
router.use((req, res, next) => {
  res.status(404).render("404");
});
module.exports = router;
