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

const updateAmenityById = async (req, res) => {
    const { amenityId } = req.params
    const {
        amenityTitle,
        amenityImage,
    } = req.body;

    try {
        await Amenity.findByIdAndUpdate(
            { _id: amenityId },
            {
                amenityTitle,
                amenityImage,
            }
        );

        res.json({
            success: true,
            message: "Amenity updated!"
        });

    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const deleteAmenityById = async (req, res) => {
    const { amenityId } = req.params

    try {
        await Amenity.deleteOne({ _id: amenityId });
        res.json({
            success: true,
            message: "Amenity Deleted Successfully!"
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};

module.exports = {
    getAllAmenity,
    addAmenity,
    getAmenityById,
    updateAmenityById,
    deleteAmenityById
};
