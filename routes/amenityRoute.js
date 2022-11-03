const express = require("express");
const {
    getAllAmenity,
    addAmenity,
    getAmenityById,
    updateAmenityById,
    deleteAmenityById,
} = require("../controllers/amenityController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/getAll").post(getAllAmenity);
router.route("/add").post(addAmenity);
router.route("/:amenityId").get(getAmenityById);
router.route("/:amenityId").put(authenticate, updateAmenityById);
router.route("/:amenityId").delete(authenticate, deleteAmenityById);

module.exports = router;
