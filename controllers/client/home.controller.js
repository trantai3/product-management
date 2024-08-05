const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
// [GET] /
module.exports.index = async (req, res) => {   
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  })
  
  const newProducts = productsHelper.priceNewProducts(productsFeatured)

  res.render("client/pages/home/index", { // send to client view and add database pageTitle
    pageTitle: "Trang chủ",
    productsFeatured: newProducts
  });
}