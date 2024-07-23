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

// [GET] /admins/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
    
        let find = {
        _id: id,
        deleted: false
        }

        const data = await Role.findOne(find)
        res.render("admin/pages/roles/edit", { // send to client view and add database pageTitle
            pageTitle: "Sửa nhóm quyền",
            data: data
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

// [PATCH] /admins/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id

        await Role.updateOne({ _id: id}, req.body)
    } catch (error) {
        
    }
    res.redirect("back")
}

// [POST] /admins/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Role.find(find)

    res.render("admin/pages/roles/permissions", { // send to client view and add database pageTitle
        pageTitle: "Phân quyền",    
        records: records
    });
    
}

// [PATCH] /admins/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    const permissions = JSON.parse(req.body.permissions)
    for (const item of permissions) {
        await Role.updateOne({ _id: item.id}, {permissions: item.permissions})
    }
    req.flash("success", "Cập nhật quyền thành công!")
    res.redirect("back")
}

