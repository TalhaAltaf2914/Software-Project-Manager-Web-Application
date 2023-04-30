const router = require("express").Router();
const signupController = require("../controllers/authControllers/signupController");
const loginController = require("../controllers/authControllers/loginController");

router.post("/signup", signupController);
router.post("/login", loginController);

module.exports = router;
