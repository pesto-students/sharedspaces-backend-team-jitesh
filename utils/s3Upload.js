const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'property-image-upload',
        // contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'private',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            cb(null, 'files_from_node/' + Date.now().toString() + file.originalname)
        }
    })
})

module.exports = {
    upload
}