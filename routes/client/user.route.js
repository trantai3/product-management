const express = require('express')  // import module 'express'
const router = express.Router();   // initialize middleware router

const controller = require('../../controllers/client/user.controller') // import home.controller file

const validate = require('../../validates/client/user.validate')

router.get('/register', controller.register)

router.post('/register', validate.registerPost, controller.registerPost)

router.get('/login', controller.login)

router.post('/login', validate.loginPost, controller.loginPost)

router.get('/logout', controller.logout)


module.exports = router 