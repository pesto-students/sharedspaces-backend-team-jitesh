const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser')
const { connectDB } = require("./config/db");

const userRoute = require("./routes/userRoute");
const propertyRoute = require("./routes/propertyRoute");
const spaceRoute = require("./routes/spaceRoute");
const bookingRoute = require("./routes/bookingRoute");
const uploadRoute = require("./routes/uploadRoute");
const amenityRoute = require("./routes/amenityRoute");
const commonRoute = require("./routes/commonRoute");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

connectDB();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send({ status: "API running!" }));

app.use("/api/user", userRoute);
app.use("/api/property", propertyRoute);
app.use("/api/space", spaceRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/image", uploadRoute);
app.use("/api/amenity", amenityRoute);
app.use("/api/common", commonRoute);


app.listen(port, () => console.log(`Server started on PORT ${port}`));
