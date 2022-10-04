const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  profileImage: { type: String },
  role: {
    type: String,
    enum: ['User', 'Landlord', 'Admin'],
    default: "User",
    required: true
  },
  loginType: {
    type: String,
    enum: ['email', 'sso'],
    default: "email",
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, { timestamps: true });


const PropertySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },
  amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],
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



const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Property"
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Space"
  },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
}, { timestamps: true });


const AmenitySchema = new mongoose.Schema({
  amenityTitle: { type: String, required: true },
  amenityImage: { type: String, required: true },
}, { timestamps: true });



const User = mongoose.model("User", UserSchema);
const Property = mongoose.model("Property", PropertySchema);
const Space = mongoose.model("Space", SpaceSchema);
const Booking = mongoose.model("Booking", BookingSchema);
const Amenity = mongoose.model("Amenity", AmenitySchema);

module.exports = {
  User,
  Property,
  Space,
  Booking,
  Amenity
};
