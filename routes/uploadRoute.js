const express = require('express')
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');


aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,

});
const BUCKET = process.env.BUCKET
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(req.params.id, file);
            const fileExtension = file.originalname.split(".")
            cb(null, `${req.params.id}.${fileExtension[1]}`)
        },

    })
})

router.post('/property/:id', upload.single('file'), async function (req, res, next) {
    res.send({ success: true, data: req.file.location })
})

router.post('/space/:id', upload.single('file'), async function (req, res, next) {
    res.send({ success: true, data: req.file.location })
})


// router.get("/list", async (req, res) => {

//     let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
//     let x = r.Contents.map(item => item.Key);
//     res.send(x)
// })


// router.get("/download/:filename", async (req, res) => {
//     const filename = req.params.filename
//     let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
//     res.send(x.Body)
// })

// router.delete("/delete/:filename", async (req, res) => {
//     const filename = req.params.filename
//     await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
//     res.send("File Deleted Successfully")

// })

module.exports = router