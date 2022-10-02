const { User, Booking, Property } = require("../models/model");
const mongoose = require('mongoose')

const getDashboardTotals = async (req, res) => {
    const { _id: userId, role } = req.user
    try {
        const users = await User.find()
        const properties = await Property.find()
        const bookings = await Booking.find().populate("propertyId")

        if (role === "Landlord") {
            const filteredProperties = properties.filter(p => p.userId.toString() == userId)
            const filteredBooking = bookings.filter(p => p.propertyId.userId.toString() == userId)
            res.json({
                success: true,
                data: {
                    totalBooking: filteredBooking.length,
                    totalProperties: filteredProperties.length,
                }
            });
            return false
        }

        res.json({
            success: true,
            data: {
                totalUser: users.filter(u => u.role === "User").length,
                totalLandlord: users.filter(u => u.role === "Landlord").length,
                totalBooking: bookings.length,
                totalProperties: properties.length,
            }
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};


module.exports = {
    getDashboardTotals
};
