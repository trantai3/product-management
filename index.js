require('dotenv').config(); //  add environment .env

const express = require('express'); // add module express
const app = express();

const database = require('./config/database'); // recall

// Set Pug
app.set('views', './views');
app.set('view engine', 'pug');

// Insert static file
app.use(express.static('public')); // anyone can see this file

// Routes client
const route = require('./routes/client/index.route'); // recall
route(app); // recall

// Routes admin
const routeAdmin = require('./routes/admin/index.route'); // recall
routeAdmin(app);

// Connect to database
database.connect(); // connect

const port = process.env.PORT; // add .ENV
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // listen port
});
