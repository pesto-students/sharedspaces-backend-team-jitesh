const express = require("express");
const {
    getAllSpace,
    addSpace,
    getSpaceById,
} = require("../controllers/spaceController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/getAll").post(getAllSpace);
router.route("/add").post(addSpace);
router.route("/:spaceId").get(getSpaceById);


module.exports = router;
