const express = require("express");
const {
    getAllProperty,
    getAllPropertyForAdminAndLordlord,
    addProperty,
    getPropertyById,
    updatePropertyById
} = require("../controllers/propertyController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/getAll").post(getAllProperty);
router.route("/admin/getAll").post(authenticate, getAllPropertyForAdminAndLordlord);
router.route("/add").post(authenticate, addProperty);
router.route("/:propertyId").get(getPropertyById);
router.route("/:propertyId").put(authenticate, updatePropertyById);



module.exports = router;
