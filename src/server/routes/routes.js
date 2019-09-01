const router = require("express").Router();
const apiRouter = require("./apiRouter");

//API Route
router.use("/api/v1", apiRouter);

module.exports = router;
