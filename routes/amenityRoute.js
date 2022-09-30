const express = require("express");
const {
    getAllAmenity,
    addAmenity,
    getAmenityById,
} = require("../controllers/amenityController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/getAll").post(getAllAmenity);
router.route("/add").post(addAmenity);
router.route("/:amenityId").get(getAmenityById);


module.exports = router;
