const Product = require("../../models/product.model")
const productsHelper = require("../../helpers/products")

// // [GET] /products
module.exports.index = async (req, res) => {   // add a property index 
    const products = await Product.find({  // handle the logics
      status: "active",
      deleted: false
    }).sort({ position: "desc" });  // get all
    const newProducts = productsHelper.priceNewProducts(products)

    res.render("client/pages/products/index", {  // send to client view 
      pageTitle: "Danh sách sản phẩm",
      products: newProducts
    })
}

// // [GET] /products
module.exports.detail = async (req, res) => {   // add a property index 
  try {
    const find = {
        deleted: false,
        slug: req.params.slug,
        status: "active"
    }

    const product = await Product.findOne(find)
    res.render("client/pages/products/detail", {
        pageTitle: product.title,
        product: product
    })
  } catch (error) {
    res.redirect(`/products`)
  }
}
