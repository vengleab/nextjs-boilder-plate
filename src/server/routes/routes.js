const router = require("express").Router();
import auth from "../controllers/AuthController";
import user from "../controllers/UserController";
import authJWT from "../middlewares/authJWT";

//API Route
router.get("/api/v1");

router.post("/login", auth.login);

//========= User =========
router.get("/me", authJWT, user.me);
router.post("/user", user.creatUser);

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
