const ProductCategory = require('../../models/product-category.model')
const systemConfig = require('../../config/system')
const createTreeHelper = require('../../helpers/createTree')
// [GET] /admins/products-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    })
    const newRecords = createTreeHelper(records)
    res.render("admin/pages/products-category/index", { // send to client view and add database pageTitle
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    })
}

// [GET] /admins/products-category/create
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    })
    const newRecords = createTreeHelper(records)
    res.render("admin/pages/products-category/create", { // send to client view and add database pageTitle
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
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

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
      const id = req.params.id
      const data = await ProductCategory.findOne({
        _id: id,
        deleted: false
      })
      const records = await ProductCategory.find({
        deleted: false
      })
      const newRecords = createTreeHelper(records)
      res.render("admin/pages/products-category/edit", {
        pageTitle: "Chỉnh sửa danh mục sản phẩm",
        data: data,
        records: newRecords
      })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}

//[PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    req.body.position = parseInt(req.body.position)
    try {
        await ProductCategory.updateOne({ _id: id}, req.body)
        req.flash("success", "Cập nhật thành công!")
        console.log(req.flash("success"))
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!")
    }
    res.redirect("back")
}
