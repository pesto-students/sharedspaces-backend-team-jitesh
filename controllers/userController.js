const { User } = require("../models/model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const userSignUp = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, image } = req.body;
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        let encryptedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            phoneNumber,
            password: encryptedPassword,
            image
        });

        res.json({
            success: true,
            message: "Registered successfully!",
            data: {
                id: user._id,
                email: user.email,
                name: user.name,
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
                    id: user._id,
                    email: user.email,
                    name: user.name,
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




module.exports = {
    userSignUp,
    userLogin
};
