const express = require('express')  // import module 'express'
const router = express.Router();   // initialize middleware router

const controller = require('../../controllers/client/cart.controller') // import home.controller file

router.get("/", controller.index)

router.post('/add/:productId', controller.addPost)   // define router handler with a path "/"

router.get('/delete/:productId', controller.delete)

router.get('/update/:productId/:quantity', controller.update)


module.exports = router // return router and reuse
