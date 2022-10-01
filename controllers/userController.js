const { User } = require("../models/model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

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
    const { user } = req
    const userId = user._id
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




module.exports = {
    userSignUp,
    userLogin,
    getAllUsers,
    getUser,
    uploadUserProfile
};
