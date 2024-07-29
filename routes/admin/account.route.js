const express = require('express')  // import module 'express'
const multer  = require('multer');
const upload = multer();
const router = express.Router();   // initialize middleware router
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require('../../controllers/admin/account.controller') // import dashboard.controller file
const validate = require("../../validates/admin/account.validate");

router.get('/', controller.index)   // define router handler with a path "/"

router.get('/create', controller.create)

router.post(
    '/create', 
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
    )

router.get('/edit/:id', controller.edit)

router.patch(
    '/edit/:id', 
    upload.single('avatar'),
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch
    )

module.exports = router // return router and reuse
