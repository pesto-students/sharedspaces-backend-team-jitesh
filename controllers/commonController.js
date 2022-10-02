const { User, Booking, Property } = require("../models/model");
const mongoose = require('mongoose')

const getDashboardTotals = async (req, res) => {
    try {
        const users = await User.find()
        const bookings = await Booking.find()
        const properties = await Property.find()

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
