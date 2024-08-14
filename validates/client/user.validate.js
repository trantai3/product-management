module.exports.registerPost = async (req, res, next) => {
    if(!req.body.fullName) {
      req.flash("error", "Vui lòng nhập họ tên!");
      res.redirect("back");
      return;
    }
  
    if(req.body.fullName.length < 5) {
      req.flash("error", "Vui lòng nhập ít nhất 5 ký tự!");
      res.redirect("back");
      return;
    }
  
    if(!req.body.email) {
      req.flash("error", "Vui lòng nhập email!");
      res.redirect("back");
      return;
    }
  
    if(!req.body.password) {
      req.flash("error", "Vui lòng nhập mật khẩu!");
      res.redirect("back");
      return;
    }
    next();
}

module.exports.loginPost = async (req, res, next) => {
    if(!req.body.email) {
      req.flash("error", "Vui lòng nhập email!");
      res.redirect("back");
      return;
    }
  
    if(!req.body.password) {
      req.flash("error", "Vui lòng nhập mật khẩu!");
      res.redirect("back");
      return;
    }
    next();
}

module.exports.forgotPasswordPost = async (req, res, next) => {
  if(!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    res.redirect("back");
    return;
  }
  next();
}