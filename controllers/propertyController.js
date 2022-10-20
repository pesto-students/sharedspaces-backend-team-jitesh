const { Property, User } = require("../models/model");
const mongoose = require('mongoose')

const getAllProperty = async (req, res) => {
    try {
        const {
            userId,
            search
        } = req.body;

        let properties = await Property.aggregate([
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

        if (userId) {
            // Attach likedProperty key by User

            const user = await User.aggregate([
                {
                    $lookup: {
                        from: 'properties',
                        foreignField: '_id',
                        localField: 'likedProperties',
                        as: 'likedProperties'
                    },
                },
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(userId)
                    }
                }
            ])

            properties = properties.map(property =>
                user[0].likedProperties.some(likedProperty => property._id.toString() === likedProperty._id.toString())
                    ? ({ ...property, likedProperty: true })
                    : ({ ...property, likedProperty: false })
            )
        }


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
    const { propertyId, userId } = req.body

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

        let propertyDetails = property[0]

        if (userId) {
            // Attach likedProperty key by User
            const user = await User.aggregate([
                {
                    $lookup: {
                        from: 'properties',
                        foreignField: '_id',
                        localField: 'likedProperties',
                        as: 'likedProperties'
                    },
                },
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(userId)
                    }
                }
            ])

            propertyDetails.likedProperty = user[0].likedProperties.some(likedProperty => propertyId === likedProperty._id.toString()) ? true : false
        }

        const { _id, name, email, phoneNumber, role, profileImage } = await User.findOne({ _id: propertyDetails.userId })
        propertyDetails.ownerDetails = { _id, name, email, phoneNumber, role, profileImage }

        res.json({
            success: true,
            data: propertyDetails
        });

    } catch (error) {
        console.log(error)
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


const deletePropertyById = async (req, res) => {
    const { propertyId } = req.params

    try {
        await Property.deleteOne({ _id: propertyId });
        res.json({
            success: true,
            message: "Property Deleted Successfully!"
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};

module.exports = {
    getAllProperty,
    getAllPropertyForAdminAndLordlord,
    addProperty,
    getPropertyById,
    updatePropertyById,
    deletePropertyById
};
