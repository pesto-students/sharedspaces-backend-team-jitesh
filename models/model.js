const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });


const PropertySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },
  propertyTitle: { type: String, required: true },
  propertyDescription: { type: String, required: true },
  propertyImage: { type: String },
  lat: { type: String },
  lng: { type: String },
  address: { type: String },
  postcode: { type: String },
  fav: { type: Boolean },
}, { timestamps: true });


const SpaceSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Property"
  },
  spaceTitle: { type: String, required: true },
  spaceDescription: { type: String, required: true },
  spaceImage: { type: String },
  noOfDesks: { type: String },
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);
const Property = mongoose.model("Property", PropertySchema);
const Space = mongoose.model("Space", SpaceSchema);

module.exports = {
  User,
  Property,
  Space
};
