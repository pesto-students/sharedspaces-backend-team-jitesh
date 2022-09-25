const express = require('express')
const router = express.Router()
const { upload } = require('../utils/s3Upload')

// Upload a file
router.post('/upload', upload.array('inputFile', 3), (req, res) => {
    if (!req.files) res.status(400).json({ error: 'No files were uploaded.' })
    console.log(req.files)
    res.status(201).json({
        message: 'Successfully uploaded ' + req.files.length + ' files!',
        files: req.files
    })
})

module.exports = router