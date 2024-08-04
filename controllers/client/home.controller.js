// [GET] /
module.exports.index = async (req, res) => {   
  res.render("client/pages/home/index", { // send to client view and add database pageTitle
    pageTitle: "Trang chủ"
  });
}