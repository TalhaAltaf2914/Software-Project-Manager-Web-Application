const router = require("express").Router();
const getProjectController = require("../controllers/projectControllers/getProjectController");
const postProjectController = require("../controllers/projectControllers/postProjectController");

router.get("/", getProjectController);
router.post("/", postProjectController);

module.exports = router;
