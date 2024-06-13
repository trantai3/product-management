const express = require('express')  // import module 'express'
const router = express.Router();   // initialize middleware router

const controller = require('../../controllers/admin/product.controller') // import dashboard.controller file
router.get('/', controller.index)   // define router handler with a path "/"

module.exports = router // return router and reuse
