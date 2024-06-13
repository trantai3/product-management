// [GET] /admins/dashboard
module.exports.dashboard = (req, res) => {   
    res.render("admin/pages/dashboard/index", { // send to client view and add database pageTitle
        pageTitle: "Trang tổng quan"
    });
}