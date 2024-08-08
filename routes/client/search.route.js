const express = require('express')  // import module 'express'
const router = express.Router();   // initialize middleware router

const controller = require('../../controllers/client/search.controller') // import home.controller file
router.get('/', controller.index)   // define router handler with a path "/"

module.exports = router // return router and reuse
