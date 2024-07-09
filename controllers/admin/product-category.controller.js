const ProductCategory = require('../../models/product-category.model')
const systemConfig = require('../../config/system')
// [GET] /admins/products-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    })
    res.render("admin/pages/products-category/index", { // send to client view and add database pageTitle
        pageTitle: "Danh mục sản phẩm",
        records: records
    })
}

// [GET] /admins/products-category/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products-category/create", { // send to client view and add database pageTitle
        pageTitle: "Tạo danh mục sản phẩm",
    })
}

// [POST] /admins/products-category/create
module.exports.createPost = async (req, res) => {
    if (req.body.position) {
        req.body.position = parseInt(req.body.position)
    } else {
        const count = await ProductCategory.countDocuments()
        req.body.position = count + 1
    }
    const record = new ProductCategory(req.body)
    await record.save()
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}


