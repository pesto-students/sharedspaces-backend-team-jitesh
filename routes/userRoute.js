const express = require("express");
const {
  userSignUp,
  userLogin,
  getAllUsers,
  uploadUserRole,
} = require("../controllers/userController");
const { authenticate, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/signUp").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/getAll").post(admin, authenticate, getAllUsers);
router.route("/updateUserRole/:userId").put(authenticate, uploadUserRole);



module.exports = router;
