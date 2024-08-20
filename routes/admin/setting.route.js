const express = require('express')  // import module 'express'
const multer = require('multer')
const router = express.Router();   // initialize middleware router

const upload = multer()

const controller = require('../../controllers/admin/setting.controller') // import dashboard.controller file
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')

router.get('/general', controller.general)   // define router handler with a path "/"

router.patch(
    '/general',
    upload.single("logo"),
    uploadCloud.upload,
    controller.generalPatch
)

module.exports = router // return router and reuse
