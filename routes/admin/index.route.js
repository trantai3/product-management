const systemConfig = require("../../config/system")
const dashboardRoutes = require("./dashboard.route")  // recall a dashboard.route
const productRoutes = require("./product.route")  // recall a dashboard.route



module.exports = (app) => {   // reuse 
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes)   // recall
    app.use(PATH_ADMIN + '/products', productRoutes)
}
