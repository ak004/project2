const User = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Modules = require('../model/modules');
const Video = require('../model/video');
const Catagories = require('../model/catagory')
const saltRounds = 10;
const mongoose = require('mongoose');
const Tools  = require('../tools.js');

// const ObjectId = new mongoose.Types.ObjectId;
require('dotenv').config();


var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
};
var tranporter = nodemailer.createTransport(smtpConfig);
 
 

tranporter.verify((error1, success) => {
    if(error1) {
    }else {
        console.log("ready for email");
        console.log(success);
    }
})


exports.home = function (req,res) {
    res.render("index", {
        test:"testt",
        user:req.session.user
    })
}

exports.login =  async  function   (req,res)  {
    if (Object.keys(req.body).length > 0) {
        const { username, password } = req.body;
        const user = await User.findOne({ user_name: username });
        if (!user) {
          return res.json({
            success: false,
            message: 'Invalid credentials username' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.json({ 
            success: false,
            message: 'Invalid credentials password' });
        }
        req.session.user = user;
        res.json({ 
            success: true,
            message: 'Login successful',
            user:user
         });
    }else {
        res.render("auth-sign-in", {
            test:"testt"
        })
    }
}


exports.logout = function (req,res) {
    req.session.destroy();
    res.redirect("/");
}

exports.signup = function (req,res) {

    if (Object.keys(req.body).length > 0) {
        User.find({username:req.body.user_name}).then((data) => {
            if(data.length > 0) {
                res.json({
                    success:false,
                    message:"Username already exists"
                })
            }else {
                User.find({phone:req.body.phone}).then((data1) => {
                    if(data1.length > 0) {
                        res.json({
                            success:false,
                            message:"Phone number already exists"
                        })
                    }else {
                        bcrypt.genSalt(saltRounds, function(err, salt) {
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                            req.body.password = hash;
                            req.body.role = "user";
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
                            });
                        });
                       
                    }
                })
            }
        })
      } else {
        res.render("auth-sign-up", {
            test:"testt"
        })
      }
 
}

exports.send_verification = function(req, res) {
 
    User.find({email: req.body.email}).then((found_user) => {
        if(found_user.length >0) {
            res.json({
                success: false,
                message: "User already exits"
            })
            return;
        }else {
            var code = Math.floor(100000 + Math.random() * 900000);
            console.log("the code is:", code);
                send(req.body.email,code);
                res.json({
                    success:true,
                    email:req.body.email,
                    codee: code,
                    message:"We send you a verfication code in your please check if there is no email please check your spam box"
                })
        }
    })


}


async function send(email,vcode) {
    const result = await tranporter.sendMail({
        from: "Mascuud",
        to: email,
        subject: 'Verfication',
        text: "Your verifaction code is: " + vcode
    });

}

exports.blank = function (req,res) {
    res.render("blank_page", {
        test:"testt"
    })
}
exports.profile = function (req,res) {
    res.render("user-profile", {
        test:"testt",
        user:req.session.user
    })
}

exports.updata_user_data = function (req,res) {
    User.find({email: req.body.email}).then((data) => {
        if(data.length > 0) {
            let date = new Date(req.body.dob);
            User.findByIdAndUpdate({_id: data[0]._id},{
                $set:{
                    name:req.body.fname,
                    last_name: req.body.lname,
                    city:req.body.city,
                    martial_status:req.body.marital_status,
                    phone:req.body.phone,
                    dob: date.toISOString(),
                    address:req.body.address.trim()
                }
            }).then(() => {
               
                req.session.destroy();
                res.redirect("/");
            })
        }else {
            res.json({
                success:false,
                message: "Couldnt find the user"
            })
        }
    })
}


exports.catagories = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        var filter = {
            "$match": {}
        };
        if(req.body.status2 == "suspended") {
            filter["$match"]["status"] = 0;
        }else if(req.body.status2 == "active") {
            filter["$match"]["status"] = 2;
        }
         if(req.session.user.role == "user") {
            filter["$match"]["user_id"] = new  mongoose.Types.ObjectId(req.session.user._id);
         }
         Catagories.aggregate([
            filter,
        ]).then((data) => {
            res.render("catagories", {
                user:req.session.user,
                data:data,
                status: req.body.status2
            })
        })

    }else {
        var filter = {
            "$match": {}
        };
        if(req.session.user.role == "user") {
            filter["$match"]["user_id"] = new  mongoose.Types.ObjectId(req.session.user._id);
         }
         Catagories.aggregate([filter]).then((mod) => {
                res.render("course_catagories", {
                    user:req.session.user,
                    data:mod,
                    status: ""
                })
        })
    }
}

exports.new_catagory = function (req,res) {
    if (Object.keys(req.body).length > 0) {

        if(req.body._id == null || req.body._id == undefined || req.body._id == "" || req.body._id.length < 5) {
            var img = "";
            var liner2 = "";
            req.files.forEach( async (imagess)  => {
          
              var url = "";
                  var image_name =tokenGenerator(29);
                  url = "./images/" + image_name + '.jpg';
                  liner2 = "images/" + image_name + '.jpg';
             
                   Tools.uploadtos3(imagess,liner2);
                  console.log("check------------", liner2);
                  img = liner2
            })
          //  delete_uncert_data();
            var save_restura = new Catagories({
                title: req.body.r_title,
                discription: req.body.desc,
                status: req.body.status == "active" ? 2 : 0,
                image:liner2
            });
            save_restura.save().then((svf) => {
                if (svf) {
                  res.redirect('/catagories')
                }
             })
        }else {
            Catagories.findOne({_id:req.body._id}).then((r) => {
                if(r) {
                    var img = "";
                          req.files.forEach( async (imagess) => {
                                    var url = "";
                                    var liner2 = "";
                                    var image_name =tokenGenerator(29);
                                    url = "./images/" + image_name + '.jpg';
                                    liner2 = "images/" + image_name + '.jpg';
                                    Tools.uploadtos3(imagess,liner2);
                                    console.log("check------------", liner2);
                                    img = liner2
                          })

                          Catagories.findByIdAndUpdate({_id: r._id}, {
                            $set:{
                                title: req.body.r_title,
                                discription: req.body.desc,
                                status: req.body.status == "active" ? 2 : 0,
                                image:img
                            }
                        }).then((upd) => {
                            if(upd) {
                                res.redirect('/catagories')
                            }else {
                                res.json({
                                    success: false,
                                    message: "Couldnt update"
                                })
                            }
                        })

                }else {
                    res.json({
                        success: false,
                        message: "Couldnt find the resturant"
                    })
                }
            })
        }

    }else {
       
        res.json({
            success: false,
            message: "no data found"
        })
    }
}


exports.modules = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        var filter = {
            "$match": {}
        };
        if(req.body.status2 == "suspended") {
            filter["$match"]["status"] = 0;
        }else if(req.body.status2 == "active") {
            filter["$match"]["status"] = 2;
        }
         if(req.session.user.role == "user") {
            filter["$match"]["user_id"] = new  mongoose.Types.ObjectId(req.session.user._id);
         }
        Modules.aggregate([
            filter,
        ]).then((data) => {
            Catagories.find({status: 2}).then((cat) => {
                res.render("modules", {
                    user:req.session.user,
                    data:data,
                    status: req.body.status2,
                    cat:cat
                })
            })
        })

    }else {
        var filter = {
            "$match": {}
        };
        if(req.session.user.role == "user") {
            filter["$match"]["user_id"] = new  mongoose.Types.ObjectId(req.session.user._id);
         }
        Modules.aggregate([filter]).then((mod) => {
            Catagories.find({status: 2}).then((cat) => {
                res.render("modules", {
                    user:req.session.user,
                    data:mod,
                    status: "",
                    cat:cat
                })
            })
        })
    }
   
}

exports.save_modules = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        if(req.body._id.length < 5) {
            var save_modeule = new Modules({
                title: req.body.title,
                discription: req.body.desc,
                duration: req.body.hours + ":" + req.body.min,
                price: Number(req.body.price),
                user_id: req.session.user._id,
                catagory_id:req.body.m_cat,
                status: req.body.status == "active" ? 2 : 0
            });
    
            save_modeule.save().then((svd) => {
                if(svd) {
                   res.json({
                    success:true,
                    message:"Module saved successfully"
                   })
                }
            })
        }else {
            Modules.findByIdAndUpdate({_id: req.body._id}, {
                $set:{
                    title: req.body.title,
                    discription: req.body.desc,
                    duration: req.body.hours + ":" + req.body.min,
                    price: Number(req.body.price),
                    user_id: req.session.user._id,
                    catagory_id:req.body.m_cat,
                    status: req.body.status == "active" ? 2 : 0
                }
            }).then((upd) => {
                if(upd) {
                    res.json({
                        success:true,
                        message:"Updated successfully"
                       })
                }
            })

        }
    }
}

exports.delete_modules = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        Modules.deleteOne({_id: req.body._id}).then(() => {
            Video.deleteMany({module_id:new  mongoose.Types.ObjectId(req.body._id) }).then(() => {
                res.json({
                    success:true,
                    message:"Module deleted successfully"
                })
            })
         })
    }
}

exports.upload_videos = function (req,res) {
    if (Object.keys(req.body).length > 0) {

    }else {
        Video.find({}).then((vids) => {
            var filter = {
                "$match": {}
            };
            if(req.session.user.role == "user") {
                filter["$match"]["user_id"] = new  mongoose.Types.ObjectId(req.session.user._id);
             }
            Modules.aggregate([filter]).then((modules) => {
                res.render("upload_videos", {
                    user:req.session.user,
                    data:vids,
                    modules:modules,
                    status: ""
                })
            })
        })
    }
}


tokenGenerator = function (length) {
    if (typeof length == "undefined") length = 32;
    var token = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));
    return token;
  };

  


