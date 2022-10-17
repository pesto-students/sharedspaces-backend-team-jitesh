const express = require("express");
const {
    getAllProperty,
    getAllPropertyForAdminAndLordlord,
    addProperty,
    getPropertyById,
    updatePropertyById,
    deletePropertyById
} = require("../controllers/propertyController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/getAll").post(getAllProperty);
router.route("/admin/getAll").post(authenticate, getAllPropertyForAdminAndLordlord);
router.route("/add").post(authenticate, addProperty);
router.route("/getOne").post(getPropertyById);
router.route("/:propertyId").put(authenticate, updatePropertyById);
router.route("/:propertyId").delete(authenticate, deletePropertyById);



module.exports = router;
