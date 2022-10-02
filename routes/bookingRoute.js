const express = require("express");
const {
    getAllBookings,
    addBooking,
    getBookingById,
    getAllBookingsByAdminAndLandlord,
} = require("../controllers/bookingController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/getAll").post(getAllBookings);
router.route("/admin/getAll").post(authenticate, getAllBookingsByAdminAndLandlord);
router.route("/add").post(addBooking);
router.route("/:bookingId").get(getBookingById);


module.exports = router;
