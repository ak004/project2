
exports.isLoggedIn = (req, res, next) => {
    if (req.session.admin) {
      next();
    } else {
      res.redirect('/login'); 
    }
  };

  exports.logout = (req,res,next) => {
    req.session.destroy(function (err, data) {
        if (err) { } else {
            res.redirect("/login");
        }
    });
  }