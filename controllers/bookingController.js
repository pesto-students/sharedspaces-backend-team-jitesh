const { Space, Property, Booking } = require("../models/model");

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("userId", { 'password': 0 })
            .populate("propertyId")
            .populate("spaceId");

        res.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const addBooking = async (req, res) => {
    try {
        const {
            userId,
            propertyId,
            spaceId,
            startDate,
            endDate,
        } = req.body;

        const space = await Booking.create({
            userId,
            propertyId,
            spaceId,
            startDate,
            endDate,
        });

        res.json({
            success: true,
            message: "Booking added!",
            data: space
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const getBookingById = async (req, res) => {
    const { bookingId } = req.params
    try {
        const booking = await Booking.findOne({ _id: bookingId })
            .populate("userId", { 'password': 0 })
            .populate("propertyId")
            .populate("spaceId");

        res.json({
            success: true,
            data: booking
        });

    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};



module.exports = {
    getAllBookings,
    addBooking,
    getBookingById
};
