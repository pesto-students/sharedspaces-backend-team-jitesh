const express = require("express");
const {
  userSignUp,
  userLogin,
  getAllUsers,
  uploadUserProfile,
  getUser,
} = require("../controllers/userController");
const { authenticate, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/signUp").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/getAll").post(admin, authenticate, getAllUsers);
router.route("/getUser").get(authenticate, getUser);
router.route("/updateUserProfile/:userId").put(authenticate, uploadUserProfile);




module.exports = router;
