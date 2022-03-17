const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const postsRouter = require("./postsRouter");

router.use("/user", userRouter);
router.use("/posts", postsRouter);

module.exports = router;
