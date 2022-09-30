const { Amenity } = require("../models/model");

const getAllAmenity = async (req, res) => {
    try {
        const amenities = await Amenity.find()

        res.json({
            success: true,
            data: amenities
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const addAmenity = async (req, res) => {
    try {
        const {
            amenityTitle,
            amenityImage,
        } = req.body;

        const amenity = await Amenity.create({
            amenityTitle,
            amenityImage,
        });

        res.json({
            success: true,
            message: "Amenity added!",
            data: amenity
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const getAmenityById = async (req, res) => {
    const { amenityId } = req.params
    try {
        const amenity = await Amenity.findOne({ _id: amenityId })

        res.json({
            success: true,
            data: amenity
        });

    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};



module.exports = {
    getAllAmenity,
    addAmenity,
    getAmenityById
};
