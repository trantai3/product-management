const categoryMiddleware = require('../../middlewares/client/category.middleware')
const cartMiddleware = require('../../middlewares/client/cart.middleware')
const userMiddleware = require('../../middlewares/client/user.middleware')
const settingMiddleware = require('../../middlewares/client/setting.middleware')

const homeRoutes = require("./home.route")  // recall a home.route
const productRoutes = require("./product.route") // recall a home.route
const searchRoutes = require("./search.route") // recall a home.route
const cartRoutes = require("./cart.route") // recall a home.route
const checkoutRoutes = require('./checkout.route')
const userRoutes = require('./user.route')
const chatRoutes = require('./chat.route')



module.exports = (app) => {   // reuse 
    app.use(categoryMiddleware.category)

    app.use(cartMiddleware.cartId)

    app.use(userMiddleware.infoUser)

    app.use(settingMiddleware.settingGeneral)

    app.use('/', homeRoutes)   // recall

    app.use('/products', productRoutes) // recall

    app.use('/search', searchRoutes) // recall

    app.use('/cart', cartRoutes) // recall

    app.use('/checkout', checkoutRoutes) // recall

    app.use('/user', userRoutes) // recall

    app.use('/chat', chatRoutes) // recall


}
