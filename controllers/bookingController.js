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

const getAllBookingsByUser = async (req, res) => {
    const { _id: userId, role } = req.user
    try {
        const bookings = await Booking.find({ userId: userId })
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


const getAllBookingsByAdminAndLandlord = async (req, res) => {
    const { _id: userId, role } = req.user

    try {
        const bookings = await Booking.find()
            .populate("userId", { 'password': 0 })
            .populate("propertyId")
            .populate("spaceId");

        if (role === "Landlord") {
            let bookingsByLandlord = bookings.filter(b => b.propertyId.userId.toString() == userId.toString())
            res.json({
                success: true,
                data: bookingsByLandlord
            });
            return false
        }

        res.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.log(error)
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

        const booking = await Booking.create({
            userId,
            propertyId,
            spaceId,
            startDate,
            endDate,
        });

        await Space.findOneAndUpdate(
            { _id: spaceId },
            { $push: { bookedDates: { startDate, endDate } } },
            { new: true }
        );

        res.json({
            success: true,
            message: "Booking Confirmed!",
            data: booking
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
    getAllBookingsByAdminAndLandlord,
    getAllBookingsByUser,
    addBooking,
    getBookingById
};
