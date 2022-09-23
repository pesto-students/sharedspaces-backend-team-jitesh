const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send({ status: "API running!" }));

app.listen(port, () => console.log(`Server started on PORT ${port}`));
