const express = require("express");
const {
  userSignUp,
  userLogin,
  getAllUsers,
  uploadUserProfile,
  getUser,
  userSocial,
  getAllLikedProperty,
  likedProperty,
  unLikedProperty,
  changePassword
} = require("../controllers/userController");
const { authenticate, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/signUp").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/social-login").post(userSocial);
router.route("/getAll").post(admin, authenticate, getAllUsers);
router.route("/getUser").get(authenticate, getUser);
router.route("/updateUserProfile/:userId").put(authenticate, uploadUserProfile);
router.route("/liked").get(authenticate, getAllLikedProperty);
router.route("/liked/:propertyId").get(authenticate, likedProperty);
router.route("/unliked/:propertyId").get(authenticate, unLikedProperty);
router.route("/change-password").post(authenticate, changePassword);





module.exports = router;
