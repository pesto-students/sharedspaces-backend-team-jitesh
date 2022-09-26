const { Property } = require("../models/model");
const mongoose = require('mongoose')

const getAllProperty = async (req, res) => {
    try {
        const {
            search
        } = req.body;


        const properties = await Property.find(search &&
        {
            $or: [{ propertyTitle: { $regex: search, $options: 'i' } }, { address: { $regex: search, $options: 'i' } }]
        }
        );

        res.json({
            success: true,
            data: properties
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const addProperty = async (req, res) => {
    try {
        const {
            userId,
            propertyTitle,
            propertyDescription,
            propertyImage,
            lat,
            lng,
            address,
            postcode,
        } = req.body;

        const property = await Property.create({
            userId,
            propertyTitle,
            propertyDescription,
            propertyImage,
            lat,
            lng,
            address,
            postcode
        });

        res.json({
            success: true,
            message: "Property added!",
            data: property
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const getPropertyById = async (req, res) => {
    const { propertyId } = req.params

    try {
        const property = await Property.aggregate([
            {
                $match: {
                    "_id": mongoose.Types.ObjectId(propertyId)
                }
            },
            {
                $graphLookup: {
                    from: 'spaces',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'propertyId',
                    as: 'spaces'
                }
            }
        ]);

        res.json({
            success: true,
            data: property[0]
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
