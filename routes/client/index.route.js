const categoryMiddleware = require('../../middlewares/client/category.middleware')
const homeRoutes = require("./home.route")  // recall a home.route
const productRoutes = require("./product.route") // recall a home.route


module.exports = (app) => {   // reuse 
    app.use(categoryMiddleware.category)

    app.use('/', homeRoutes)   // recall

    app.use('/products', productRoutes) // recall

    
}
