const express = require('express')  // import module 'express'
const router = express.Router();   // initialize middleware router

const controller = require('../../controllers/client/checkout.controller') // import home.controller file

router.get('/', controller.index)   // define router handler with a path "/"

router.post('/order', controller.order)

router.get('/success/:orderId', controller.success)

module.exports = router // return router and reuse

