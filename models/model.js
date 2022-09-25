const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });


const PropertySchema = new mongoose.Schema({
  propertyTitle: { type: String, required: true },
  propertyDescription: { type: String, required: true },
  propertyImage: { type: String },
  lat: { type: String },
  lng: { type: String },
  address: { type: String },
  postcode: { type: String },
  fav: { type: Boolean },
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);
const Property = mongoose.model("Property", PropertySchema);

module.exports = {
  User,
  Property
};
