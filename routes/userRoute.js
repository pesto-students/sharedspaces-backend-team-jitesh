const express = require("express");
const {
  userSignUp,
  userLogin,
} = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/signUp").post(userSignUp);
router.route("/login").post(userLogin);


module.exports = router;
