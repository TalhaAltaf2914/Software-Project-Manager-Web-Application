const router = require("express").Router();
const getOrganizationController = require("../controllers/organizationControllers/getOrganizationController");
const postOrganizationController = require("../controllers/organizationControllers/postOrganizationController");

router.get("/", getOrganizationController);
router.post("/", postOrganizationController);

module.exports = router;
