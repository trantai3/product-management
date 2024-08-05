const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")
// [GET] /
module.exports.index = async (req, res) => {   
  // Start get outstanding products
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  }).limit(6)
  
  const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured)
  // End get outstanding products
  // Start get newest products
  const productsNew = await Product.find({
    deleted: false,
    status: "active",
  }).sort({ position: "desc" }).limit(6)
  const newProductsNew = productsHelper.priceNewProducts(productsNew)
  res.render("client/pages/home/index", { // send to client view and add database pageTitle
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew

  });
}