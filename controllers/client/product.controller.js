const Product = require("../../models/product.model")
// // [GET] /products
module.exports.index = async (req, res) => {   // add a property index 
    const products = await Product.find({  // handle the logics
      status: "active",
      deleted: false
    }).sort({ position: "desc" });  // get all
    
    console.log(products)
    const newProduct = products.map(item => {
        item.newPrice = (item.price*(100 - item.discountPercentage)/100).toFixed(0)
        return item
    })

    res.render("client/pages/products/index", {  // send to client view 
      pageTitle: "Danh sách sản phẩm",
      products: newProduct               
    })
  }