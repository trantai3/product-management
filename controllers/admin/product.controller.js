const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus") // import 
const searchHelper = require("../../helpers/search")
// [GET] /admins/products
module.exports.index = async (req, res) => {   
    // console.log(req.query.status)  // http://localhost:3000/admin/products?status=active so controller get request and transfer variable to query key

    //Start: Filter Status
    const filterStatus = filterStatusHelper(req.query)
    //End: Filter Status
    let find = {
        deleted: false
    }
    
    if (req.query.status) {
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query)
    if(objectSearch.keyword) {
        find.title = objectSearch.regex
    }
    const products = await Product.find(find)

    // console.log(products)
    res.render("admin/pages/products/index", { // send to client view and add database pageTitle
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}