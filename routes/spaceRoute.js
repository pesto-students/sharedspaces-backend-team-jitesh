const express = require("express");
const {
    getAllSpace,
    addSpace,
    getSpaceById,
    updateSpaceById
} = require("../controllers/spaceController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/getAll").post(getAllSpace);
router.route("/add").post(authenticate, addSpace);
router.route("/:spaceId").get(getSpaceById);
router.route("/:spaceId").put(authenticate, updateSpaceById);


module.exports = router;
