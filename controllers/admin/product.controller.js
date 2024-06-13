const Product = require("../../models/product.model")
// [GET] /admins/products
module.exports.index = async (req, res) => {   
    const products = await Product.find({
        deleted: false
    })

    console.log(products)
    res.render("admin/pages/products/index", { // send to client view and add database pageTitle
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
}