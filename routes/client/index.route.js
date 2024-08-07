const categoryMiddleware = require('../../middlewares/client/category.middleware')
const cartMiddleware = require('../../middlewares/client/cart.middleware')

const homeRoutes = require("./home.route")  // recall a home.route
const productRoutes = require("./product.route") // recall a home.route
const searchRoutes = require("./search.route") // recall a home.route
const cartRoutes = require("./cart.route") // recall a home.route




module.exports = (app) => {   // reuse 
    app.use(categoryMiddleware.category)

    app.use(cartMiddleware.cartId)


    app.use('/', homeRoutes)   // recall

    app.use('/products', productRoutes) // recall

    app.use('/search', searchRoutes) // recall

    app.use('/cart', cartRoutes) // recall

    
}
