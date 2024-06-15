const Product = require("../../models/product.model")
// [GET] /admins/products
module.exports.index = async (req, res) => {   
    // console.log(req.query.status)  // http://localhost:3000/admin/products?status=active so controller get request and transfer variable to query key

    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    if (req.query.status) {  // key active on URL
        const index = filterStatus.findIndex(item => item.status == req.query.status) // check if status of every items == status of user add
        filterStatus[index].class = "active" // add class = "active"
    } else {
        const index = filterStatus.findIndex(item => item.status == "") 
        filterStatus[index].class = "active" 
    }
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