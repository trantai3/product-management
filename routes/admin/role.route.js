const express = require('express')  // import module 'express'
const router = express.Router();   // initialize middleware router

const controller = require('../../controllers/admin/role.controller') // import dashboard.controller file

router.get('/', controller.index)   // define router handler with a path "/"

router.get('/create', controller.create)

router.post('/create', controller.createPost)

router.get('/edit/:id', controller.edit)

router.patch('/edit/:id', controller.editPatch)

router.get('/permissions', controller.permissions)

router.patch('/permissions', controller.permissionsPatch)

module.exports = router // return router and reuse
