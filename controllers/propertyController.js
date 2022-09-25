const { Property } = require("../models/model");

const getAllProperty = async (req, res) => {
    try {
        const {
            search
        } = req.body;

        const properties = await Property.find();

        res.json({
            status: true,
            data: properties
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const addProperty = async (req, res) => {
    try {
        const {
            propertyTitle,
            propertyDescription,
            propertyImage,
            lat,
            lng,
            address,
            postcode,
        } = req.body;

        const property = await Property.create({
            propertyTitle,
            propertyDescription,
            propertyImage,
            lat,
            lng,
            address,
            postcode
        });

        res.json({
            status: true,
            message: "Property added!",
            data: property
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const getPropertyById = async (req, res) => {
    try {
        const {
            propertyTitle,
            propertyDescription,
            propertyImage,
            lat,
            lng,
            address,
            postcode,
        } = req.body;

        const property = await Property.create({
            propertyTitle,
            propertyDescription,
            propertyImage,
            lat,
            lng,
            address,
            postcode
        });

        res.json({
            status: true,
            message: "Property added!",
            data: property
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};



module.exports = {
    getAllProperty,
    addProperty,
    getPropertyById
};
