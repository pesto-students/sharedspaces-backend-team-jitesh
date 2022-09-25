const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser')
const { connectDB } = require("./config/db");

const userRoute = require("./routes/userRoute");
const propertyRoute = require("./routes/propertyRoute");
const uploadRoute = require("./routes/uploadRoute");

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
app.use("/api/image", uploadRoute);


app.listen(port, () => console.log(`Server started on PORT ${port}`));
