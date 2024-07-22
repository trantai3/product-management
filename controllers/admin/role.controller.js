const Role = require('../../models/role.model')
const systemConfig = require("../../config/system")

// [GET] /admins/roles
module.exports.index = async (req, res) => {   
    let find = {
        deleted: false
    }

    const records = await Role.find(find)
    res.render("admin/pages/roles/index", { // send to client view and add database pageTitle
        pageTitle: "Nhóm quyền",
        records: records
    });
}

// [GET] /admins/roles/create
module.exports.create = async (req, res) => {   
    let find = {
        deleted: false
    }

    const records = await Role.find(find)
    res.render("admin/pages/roles/create", { // send to client view and add database pageTitle
        pageTitle: "Tạo nhóm quyền",    
        records: records
    });
}

// [POST] /admins/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}