module.exports.index = (req, res) => {   
    res.render("admin/pages/products/index", { // send to client view and add database pageTitle
        pageTitle: "Danh sách sản phẩm"
    });
}