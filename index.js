require('dotenv').config(); //  add environment .env
const methodOverride = require('method-override') // overwrite
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require("express-flash")
const express = require('express'); // add module express
const app = express();

const database = require('./config/database'); // recall
// Connect to database
database.connect(); // connect

// Set Pug
app.set('views', './views');
app.set('view engine', 'pug');

// Flash
app.use(cookieParser('andrew garfield'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash 

app.use(express.static('public')); // anyone can see this file

// Insert method override
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Routes client
const route = require('./routes/client/index.route'); // recall
route(app); // recall

// Routes admin
const routeAdmin = require('./routes/admin/index.route'); // recall
routeAdmin(app);


// App Locals Variables
const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin
// prefixAdmin variable exits all pug files

const port = process.env.PORT; // add .ENV
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // listen port
});
