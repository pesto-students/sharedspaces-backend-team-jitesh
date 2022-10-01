const { Property } = require("../models/model");
const mongoose = require('mongoose')

const getAllProperty = async (req, res) => {
    try {
        const {
            search
        } = req.body;

        const properties = await Property.aggregate([
            {
                $graphLookup: {
                    from: 'spaces',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'propertyId',
                    as: 'spaces'
                }
            },
            {
                $lookup: {
                    from: 'amenities',
                    foreignField: '_id',
                    localField: 'amenities',
                    as: 'amenities'
                }
            },

            search ? {
                $match: {
                    $or: [{ propertyTitle: { $regex: search, $options: 'i' } }, { address: { $regex: search, $options: 'i' } }]
                }
            } : { $match: {} }
        ])

        res.json({
            success: true,
            data: properties
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const getAllPropertyForAdminAndLordlord = async (req, res) => {
    try {
        const { _id: userId, role } = req.user

        const properties = await Property.aggregate([
            {
                $graphLookup: {
                    from: 'spaces',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'propertyId',
                    as: 'spaces'
                }
            },
            {
                $lookup: {
                    from: 'amenities',
                    foreignField: '_id',
                    localField: 'amenities',
                    as: 'amenities'
                }
            },
            role === "Landlord" ? {
                $match: {
                    "userId": mongoose.Types.ObjectId(userId)
                }
            } : { $match: {} }
        ])

        res.json({
            success: true,
            data: properties
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};


const addProperty = async (req, res) => {
    const { _id: userId } = req.user
    try {
        const {
            propertyTitle,
            propertyDescription,
            propertyImage,
            lat,
            lng,
            address,
            postcode,
            amenities
        } = req.body;

        const property = await Property.create({
            userId,
            propertyTitle,
            propertyDescription,
            propertyImage,
            lat,
            lng,
            address,
            postcode,
            amenities
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
            },
            {
                $lookup: {
                    from: 'amenities',
                    foreignField: '_id',
                    localField: 'amenities',
                    as: 'amenities'
                }
            },
        ]);



        res.json({
            success: true,
            data: property[0]
        });

    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};


const updatePropertyById = async (req, res) => {
    const { propertyId } = req.params
    const {
        userId,
        propertyTitle,
        propertyDescription,
        propertyImage,
        lat,
        lng,
        address,
        postcode,
        amenities
    } = req.body;

    try {
        await Property.findByIdAndUpdate(
            { _id: propertyId },
            {
                userId,
                propertyTitle,
                propertyDescription,
                propertyImage,
                lat,
                lng,
                address,
                postcode,
                amenities
            }
        );

        res.json({
            success: true
        });

    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};



module.exports = {
    getAllProperty,
    getAllPropertyForAdminAndLordlord,
    addProperty,
    getPropertyById,
    updatePropertyById
};
