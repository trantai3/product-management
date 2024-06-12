const express = require('express') // add module express
require('dotenv').config()         // add module .env

const database = require("./config/database") // recall
database.connect()      // connect
const route = require("./routes/client/index.route") // recall



const app = express()
const port = process.env.PORT;   // add .ENV

// Set Pug
app.set('views', './views')
app.set('view engine', 'pug')

// Insert static file
app.use(express.static('public')) // anyone can see this file

// Routes
route(app) // recall
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) // listen port
})