const { User } = require("../models/model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const mongoose = require('mongoose')

const userSignUp = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role, active, profileImage } = req.body;
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        let encryptedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            phoneNumber,
            password: encryptedPassword,
            role,
            active,
            profileImage
        });

        res.json({
            success: true,
            message: "Registered successfully!",
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profileImage: user.profileImage,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        res.json({ success: false, message: "User already exist!" });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            res.json({
                success: true,
                message: "Loggedin successfully!",
                data: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    profileImage: user.profileImage,
                    token: generateToken(user._id)
                }
            });
        } else {
            res.json({ success: false, message: "Invalid Password" });
        }
    } else {
        res.json({ success: false, message: "User not found!" });
    }
};

const userSocial = async (req, res) => {
    const { name, email, phoneNumber, profileImage, loginType } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.json({
            success: true,
            message: "Loggedin successfully!",
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profileImage: user.profileImage,
                token: generateToken(user._id)
            }
        });
    } else {
        const user = await User.create({
            name,
            email,
            phoneNumber,
            password: "null",
            profileImage,
            loginType
        });

        res.json({
            success: true,
            message: "Loggedin successfully!",
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profileImage: user.profileImage,
                token: generateToken(user._id)
            }
        });
    }

};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};


const getUser = async (req, res) => {
    const { _id: userId } = req.user
    try {
        const { _id, name, email, phoneNumber, role, profileImage } = await User.findOne({ _id: userId })
        res.json({
            success: true,
            data: { _id, name, email, phoneNumber, role, profileImage }
        });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const uploadUserProfile = async (req, res) => {
    const { userId } = req.params
    const { name, phoneNumber, password, role, profileImage } = req.body

    try {
        const user = await User.findByIdAndUpdate(
            { _id: userId },
            {
                name, phoneNumber, password, role, profileImage
            },
            { new: true }
        );

        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profileImage: user.profileImage,
            }
        });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};

const getAllLikedProperty = async (req, res) => {
    const { _id: userId } = req.user
    try {
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

        if (user && user.length > 0) {
            const properties = await user[0].likedProperties
            res.json({
                success: true,
                data: properties
            });
        } else {
            res.json({
                success: true,
                data: []
            });
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
}



const likedProperty = async (req, res) => {
    const { _id: userId } = req.user
    const { propertyId } = req.params
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { likedProperties: propertyId } },
            { new: true }
        );

        res.json({
            success: true
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};


const unLikedProperty = async (req, res) => {
    const { _id: userId } = req.user
    const { propertyId } = req.params
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { likedProperties: propertyId } },
            { new: true }
        );

        res.json({
            success: true
        });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Something went wrong!" });
    }
};



module.exports = {
    userSignUp,
    userLogin,
    userSocial,
    getAllUsers,
    getUser,
    uploadUserProfile,
    getAllLikedProperty,
    likedProperty,
    unLikedProperty
};
