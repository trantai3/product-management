const Product = require("../../models/product.model")
const ProductCategory = require('../../models/product-category.model')
const Account = require('../../models/account.model')
const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus") // import 
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const createTreeHelper = require('../../helpers/createTree')

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

    // Sort
    const sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey
        const sortValue = req.query.sortValue
        sort[sortKey] = sortValue
    } else {
        sort.position = "desc"
    }
    const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
    // limit: restrict how many products
    // skip: ignore how many products
    
    for (const product of products) {
        const user = await Account.findOne({
            _id: product.createdBy.account_id
        })
        
        if (user) {
            product.accountFullName = user.fullName
        }
    }
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
    let find = {
        deleted: false
    }
    const category = await ProductCategory.find(find)
    const newCategory = createTreeHelper(category)
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
        category: newCategory
    }) 
        
}

// [POST] /admins/products/create
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

    req.body.createdBy = {
        account_id: res.locals.user.id
    }
    const product = new Product(req.body)
    await product.save()

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admins/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find)
        const category = await ProductCategory.find({
            deleted: false
        })
        const newCategory = createTreeHelper(category)
        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product,
            category: newCategory
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

// [PATCH] /admins/products/edit:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)
    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        await Product.updateOne({ _id: id}, req.body)
        req.flash("success", "Cập nhật thành công!")
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!")
    }

    res.redirect("back")
}

// [GET] /admins/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find)
        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}