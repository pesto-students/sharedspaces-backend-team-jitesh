const express = require("express");
const {
    getDashboardTotals
} = require("../controllers/commonController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();


router.route("/dashboard/getAll").get(authenticate, getDashboardTotals);


module.exports = router;
