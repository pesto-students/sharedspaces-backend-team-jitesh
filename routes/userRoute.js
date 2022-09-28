const express = require("express");
const {
  userSignUp,
  userLogin,
  getAllUsers,
} = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/signUp").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/getAll").post(getAllUsers);


module.exports = router;
