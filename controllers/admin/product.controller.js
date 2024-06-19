const Product = require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus") // import 
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
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

    // Pagination
    const countProducts = await Product.countDocuments(find)
    let objectPagination = paginationHelper(
      {
        currentPage: 1,
        limitItems: 4
      },
      req.query,
      countProducts
    )

    // if (req.query.page) {
    //     objectPagination.currentPage = parseInt(req.query.page)
    // }
    // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    // const countProducts = await Product.countDocuments(find)
    // const totalPage = Math.ceil(countProducts / objectPagination.limitItems)
    // objectPagination.totalPage = totalPage
    // End Pagination
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    // limit: restrict how many products
    // skip: ignore how many products
    // console.log(products)
    res.render("admin/pages/products/index", { // send to client view and add database pageTitle
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [GET] /admins/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status    // params: :status/:id
    const id = req.params.id
    await Product.updateOne({ _id: id}, { status: status})                                 // update a production
    res.redirect("back")
}