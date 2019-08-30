const router = require("express").Router();
const apiRouter = require("./apiRouter");
import auth from "../controllers/AuthController";

//API Route
router.use("/api/v1", apiRouter);
router.post("/login", auth.login);

module.exports = router;
