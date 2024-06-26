const express = require('express')  // import module 'express'
const multer  = require('multer')
const router = express.Router();   // initialize middleware router
const storageMulter = require('../../helpers/storageMulter')
const upload = multer({ storage: storageMulter() })


const controller = require('../../controllers/admin/product.controller') // import dashboard.controller file
const validate = require('../../validates/admin/product.validate') // import validate file

router.get('/', controller.index)   // define router handler with a path "/"


router.patch('/change-status/:status/:id', controller.changeStatus) // status var can change the value

router.patch('/change-multi', controller.changeMulti)

router.delete('/delete/:id', controller.deleteItem)

router.get('/create', controller.create)

router.post(
    '/create', 
    upload.single('thumbnail'),
    validate.createPost, // middleware 
    controller.createPost)

router.get('/edit/:id', controller.edit)

router.patch(
    '/edit/:id', 
    upload.single('thumbnail'),
    validate.createPost, // middleware 
    controller.editPatch)

module.exports = router // return router and reuse
