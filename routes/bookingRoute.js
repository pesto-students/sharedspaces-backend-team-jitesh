const express = require("express");
const {
    getAllBookings,
    addBooking,
    getBookingById,
} = require("../controllers/bookingController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/getAll").post(getAllBookings);
router.route("/add").post(addBooking);
router.route("/:bookingId").get(getBookingById);


module.exports = router;
