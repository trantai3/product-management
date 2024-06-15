const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus") // import 
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

    let keyword = ""
    if(req.query.keyword) {
        keyword = req.query.keyword
        const regex = new RegExp(keyword, "i") // i: no difference between uppercase and lowercase
        // const regex = /keyword/i // false cause look for "keyword" word in database
        find.title = regex
    }
    const products = await Product.find(find)

    // console.log(products)
    res.render("admin/pages/products/index", { // send to client view and add database pageTitle
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    })
}