const { Space, Property, User } = require("../models/model");

const getAllSpace = async (req, res) => {
    try {
        const spaces = await Space.find().populate("propertyId");

        res.json({
            success: true,
            data: spaces
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const addSpace = async (req, res) => {
    try {
        const {
            propertyId,
            spaceTitle,
            spaceDescription,
            spaceImage,
            noOfDesks
        } = req.body;

        const space = await Space.create({
            propertyId,
            spaceTitle,
            spaceDescription,
            spaceImage,
            noOfDesks
        });

        res.json({
            success: true,
            message: "Space added!",
            data: space
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const getSpaceById = async (req, res) => {
    const { spaceId } = req.params
    try {
        const space = await Space.findOne({ _id: spaceId }).populate("propertyId");
        const property = await Property.aggregate([
            {
                $match: {
                    "_id": space.propertyId._id
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

        const otherSpaces = property[0].spaces.filter(s => s._id != spaceId)

        const { _id, name, email, phoneNumber, role, profileImage } = await User.findOne({ _id: space.propertyId.userId })
        const ownerDetails = { _id, name, email, phoneNumber, role, profileImage }

        res.json({
            success: true,
            data: {
                space,
                otherSpaces,
                ownerDetails
            }
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};


const updateSpaceById = async (req, res) => {
    const { spaceId } = req.params
    const {
        spaceTitle,
        spaceDescription,
        spaceImage,
        noOfDesks
    } = req.body;

    try {
        await Space.findByIdAndUpdate(
            { _id: spaceId },
            {
                spaceTitle,
                spaceDescription,
                spaceImage,
                noOfDesks
            }
        );

        res.json({
            success: true,
            message: "Space updated!"
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};


const deleteSpaceById = async (req, res) => {
    const { spaceId } = req.params

    try {
        await Space.deleteOne({ _id: spaceId });
        res.json({
            success: true,
            message: "Space Deleted Successfully!"
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};



module.exports = {
    getAllSpace,
    addSpace,
    getSpaceById,
    updateSpaceById,
    deleteSpaceById
};
