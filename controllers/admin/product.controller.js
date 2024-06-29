const Product = require("../../models/product.model")
const systemConfig = require("../../config/system")
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
    const products = await Product.find(find).sort({position: "desc"}).limit(objectPagination.limitItems).skip(objectPagination.skip)
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

// [PATCH] /admins/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status    // params: :status/:id
    const id = req.params.id
    await Product.updateOne({ _id: id}, { status: status})  // update a production
    req.flash("success", "Cập nhật trạng thái thành công!")
    res.redirect("back")
}   

// [PATCH] /admins/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids }}, {status: "active"})
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`)
            break;

        case "inactive":
            await Product.updateMany({ _id: { $in: ids }}, {status: "inactive"})
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`)
            break;

        case "delete-all":
            await Product.updateMany({ _id: { $in: ids }}, {deleted: true, deletedAt: new Date()})

        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-")
                position = parseInt(position)

                await Product.updateOne({_id: id}, {
                    position: position
                })
            }
            break;
        default:

            break;

    }
    res.redirect("back")
}   

// [DELETE] /admins/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id
    // await Product.deleteOne({ _id: id})  // delete a product
    await Product.updateOne({_id : id},
    {
        deleted: true,
        deletedAt: new Date()
    })
    req.flash("success", "Xóa thành công!")
    res.redirect("back")
}  

// [GET] /admins/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm"
    })
}

// [GET] /admins/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if (req.body.position == "") {
        const countProducts = await Product.countDocuments()
        req.body.position = countProducts + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }
    
    const product = new Product(req.body)
    await product.save()

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

