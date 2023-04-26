const User = require('../model/user');

exports.home = function (req,res) {
    res.render("index", {
        test:"testt"
    })
}

exports.login = function (req,res) {
    res.render("auth-sign-in", {
        test:"testt"
    })
}

exports.signup = function (req,res) {

    if (Object.keys(req.body).length > 0) {
         console.log("the bodyy", req.body);
        User.find({username:req.body.username}).then((data) => {
            if(data.length > 0) {
                res.json({
                    success:false,
                    message:"Username already exists"
                })
            }else {
                new User(req.body).save().then((sv_data) => {
                    if(sv_data)  {
                        res.json({
                            success: true,
                            message:"User created successfully"
                        })
                    }else {
                        res.json({
                            success: false,
                            message:"Something went wrong"
                        })
                    }
                } )
            }
        })
      } else {
        res.render("auth-sign-up", {
            test:"testt"
        })
      }
 
}


exports.blank = function (req,res) {
    res.render("blank_page", {
        test:"testt"
    })
}