const express = require("express");
const {
    getAllProperty,
    addProperty,
    getPropertyById,
    updatePropertyById,
} = require("../controllers/propertyController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/getAll").post(getAllProperty);
router.route("/add").post(addProperty);
router.route("/:propertyId").get(getPropertyById);
router.route("/:propertyId").put(updatePropertyById);


module.exports = router;
