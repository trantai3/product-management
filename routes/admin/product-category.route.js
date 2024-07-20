const express = require('express') // import module 'express'
const multer = require('multer')

const router = express.Router(); // initialize middleware router
const upload = multer()


const controller = require('../../controllers/admin/product-category.controller') // import dashboard.controller file

const validate = require('../../validates/admin/product-category.validate') // import validate file
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')


router.get('/', controller.index) // define router handler with a path "/"

router.get('/create', controller.create) // define router handler with a path "/"

router.post(
  '/create',
  upload.single('thumbnail'),
  uploadCloud.upload,
  validate.createPost, // middleware 
  controller.createPost
)

router.get('/edit/:id', controller.edit)

router.patch(
  '/edit/:id',
  upload.single('thumbnail'),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
)

module.exports = router // return router and reuse