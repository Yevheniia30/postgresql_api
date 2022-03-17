const Router = require("express");
const router = new Router();
const postsController = require("../controllers/postsController");

router.post("/create", postsController.create);
router.get("/", postsController.get);
router.get("/:id", postsController.getOne);
router.delete("/:id", postsController.delete);

module.exports = router;
