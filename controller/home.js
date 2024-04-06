const User = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Modules = require('../model/modules');
const Video = require('../model/video');
const Catagories = require('../model/catagory')
const Menu = require('../model/menu');
const Page = require('../model/page');
const Resources = require('../model/resource.js')
const Qr_code_session = require('../model/qr_code_session')
const Bought_course = require('../model/bought_course')
const saltRounds = 10;
const fs            = require('fs-extra')
const mongoose = require('mongoose');
const Tools  = require('../tools.js');
const AWS = require('aws-sdk');
const WebSocket = require('ws');
const ObjectId = new mongoose.Types.ObjectId;
require('dotenv').config();
const mime = require('mime');
const multer = require('multer');
const upload = multer();
const path = require('path');
const qrcode = require('qrcode');
var moment = require("moment");
var defalult_data = require("../startupData");

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


exports.showimage = function (req,res) {

    const readstreamm =  Tools.getStreamImage("tutoring_images/images/"+ req.params.key);
    readstreamm.pipe(res)
}


exports.showvids = function (req,res) {
console.log("thhe valuere", req.params.key)
    const readstreamm =  Tools.getStreamImage("vids/" + req.params.key);
    res.setHeader('Content-Type', 'video/mp4');
    readstreamm.pipe(res);
}

exports.showattachement = function (req,res) {
    console.log("the value", req.params.key);

    const filePath = "tutoring_images/attachments/" + req.params.key;
    
    // Determine the MIME type based on the file extension
    const fileExtension = path.extname(filePath).toLowerCase();
    const mimeType = mime.getType(fileExtension) || 'application/octet-stream';

    // Set the appropriate Content-Type header
    res.setHeader('Content-Type', mimeType);

    // Stream the file content to the response
    const readstreamm = Tools.getStreamImage(filePath);
    readstreamm.pipe(res);
    }
    


exports.home = function (req,res) {
        console.log("the  user,: ", new  mongoose.Types.ObjectId(req.session.user._id));
    Modules.aggregate([
        {
            $match: {status: 2, user_id: new  mongoose.Types.ObjectId(req.session.user._id) }
        },
        {
            $lookup:{
                from: "catagories",
                localField: "catagory_id",
                foreignField: "_id",
                as: "cat"
            }
        },
        {
            $unwind: "$cat"
        },
    ]).then((cour) => {
        Video.find({status: 2, user_id:req.session.user._id}).then((vids) => {
            Bought_course.aggregate([
                
                {
                    $lookup:{
                        from: "modules",
                        localField: "module_id",
                        foreignField: "_id",
                        as: "mod"
                    }
                },
                {
                    $unwind: "$mod"
                },
                {
                    $match: {
                        "mod.user_id":new  mongoose.Types.ObjectId(req.session.user._id)
                    }
                }
            ]).then((bou) => {

                Resources.aggregate([
                        {
                            $match:{created_by: new  mongoose.Types.ObjectId(req.session.user._id)}
                        },
                        {
                            $lookup:{
                                from: "catagories",
                                localField: "catagory_id",
                                foreignField: "_id",
                                as: "cat"
                            }
                        },
                        {
                            $unwind: "$cat"
                        },
                        {
                            $sort: {no_download: -1}
                        },
                        {
                            $limit: 3
                        }

                ]).then((resource) => {
                var total_course = cour.length;
                var total_vids = vids.length;
                var total_bought_course = bou.length;

                res.render("index", {
                    test:"home",
                    user:req.session.user,
                    menu:req.session.menus,
                    total_course,
                    total_vids,
                    total_bought_course,
                    cour,
                    moment,
                    resource
                })
            })
            })
        })
    })
   
}

exports.home_page = async function (req,res) {
    await User.find({}).then((data)=> {
        if(data.length==0){
            var menus_data = defalult_data.menus;
            // save the menus first
             menus_data.forEach(element => {
                Menu.findOneAndUpdate({name:element.name},element,{upsert:true}).then((s)=>{
                    console.log("menu saved")
                })
            })
            // save the pages second
            var pages_data = defalult_data.pages;
            pages_data.forEach(element => {
                Page.findOneAndUpdate({name:element.name},element,{upsert:true}).then((s)=>{
                    console.log("pages saved")
                })
            })

            // save the catagores  
            var catagores = defalult_data.catagores;
            catagores.forEach(element => {
                Catagories.findOneAndUpdate({title:element.title},element,{upsert:true}).then((s)=>{
                    console.log("catagores saved")
                })
            })

            // save the modules    
            var modules = defalult_data.modules;
            modules.forEach(element => {
                Modules.findOneAndUpdate({title:element.title},element,{upsert:true}).then((s)=>{
                    console.log("modules saved")
                })
            })

             // save the vids  
             var vids = defalult_data.vidoes;
             vids.forEach(element => {
                Video.findOneAndUpdate({title:element.title},element,{upsert:true}).then((s)=>{
                     console.log("Video saved")
                 })
             })


               // save the users  
               var users = defalult_data.users;
               users.forEach(element => {
                User.findOneAndUpdate({user_name:element.user_name},element,{upsert:true}).then((s)=>{
                       console.log("User saved")
                   })
               })
        }
    })

    Modules.aggregate([
        {
            $lookup:{
                from: "video",
                localField: "_id",
                foreignField: "module_id",
                as: "vid"
            }
        },
    ]).then((courses) => {
        res.render("home", {
            test:"testt",
            user:req.session.user,
            menu:req.session.menus,
            courses:courses
        })
    })
}

exports.login =  async  function   (req,res)  {
    const userIdentifier = req.sessionID;
    var random_num = generateRandomNumber();

    Qr_code_session.findOneAndUpdate({session_id:userIdentifier }, {
        $set: {
            random_number:random_num,
            session_id: userIdentifier,
            user_id:null,
            logged_in:false
        }
    }, {
        upsert: true,
        new: true,  
        runValidators: true,  
      }).then((data) => {
        console.log("the sessionID: ",userIdentifier);
        qrcode.toFile(
            './assets/user_qr.png',  
            userIdentifier+ "-number:" +random_num,
            {
              errorCorrectionLevel: 'H', 
              margin: 3, 
              color: {
                dark: '#000000', // Color of the dark squares
                light: '#ffffff', // Color of the light squares
              },
            },
            (err) => {
              if (err) throw err;
              console.log('QR code saved as user_qr.png');
            }
          );
      })
    if (Object.keys(req.body).length > 0) {
        const { username, password } = req.body;
        const user = await User.findOne({ user_name: username });
        if (!user) {
          return res.json({
            success: false,
            message: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.json({ 
            success: false,
            message: 'Invalid credentials' });
        }
        Page.aggregate([
            {
                $lookup:{
                    from: "menus",
                    localField: "menu_id",
                    foreignField: "_id",
                    as: "menu"
                }
            },
            {
                $unwind: "$menu"
            },

                    {
                        $group:{ 
                            _id:"$menu._id",
                            menu_name: { $last:"$menu.name"},
                            menu_icon: { $last:"$menu.icon"},
                            page:{
                                $push:{
                                page_id:"$_id",
                                page_name:"$name",
                                page_url:"$url" ,
                                page_icon: "$icon"
                         
                                }
                                }
                            }
                        
                        },
                    {
                        $sort:{_id:1}
                    }

        ]).then((pages) => {
            req.session.user = user;
            req.session.menus = pages;
            res.json({ 
                success: true,
                message: 'Login successful',
                user:user,
                record: {
                    user:user,
                }
             });
        })
    }else {
        res.render("auth-sign-in", {
            test:"testt",
            session: req.session,
            sessionID: req.sessionID
        })
    }
}


exports.logout = function (req,res) {
    req.session.destroy();
    res.redirect("/login");
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
                                        message:"User created successfully",
                                        record: {
                                            user:sv_data
                                        }
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
            test:"testt",
            menu:req.session.menus
        })
      }
 
}

exports.send_verification = function(req, res) {
    console.log("firs iam here")
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
                // send(req.body.email,code);
                res.json({
                    success:true,
                    email:req.body.email,
                    codee: code,
                    message:"We send you a verfication code in your please check if there is no email please check your spam box",
                    record: {
                        email:req.body.email,
                        code: code,
                    }
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
        user:req.session.user,
        menu:req.session.menus
    })
}

exports.updata_user_data = function (req,res) {
    User.find({email: req.body.email}).then((data) => {
        if(data.length > 0) {
            console.log("the files", req.files);

            var img = "";
            var liner2 = "";
            if(req.files.length > 0) {
                req.files.forEach( async (imagess)  => {
          
                    var url = "";
                        var image_name =tokenGenerator(29);
                        url = "./images/" + image_name + '.jpg';
                        liner2 = "images/" + image_name + '.jpg';
                   
                         Tools.uploadtos3(imagess,liner2);
                        console.log("check------------", liner2);
                        img = liner2
                  })
      
            }
           
            let date = new Date(req.body.dob);
            User.findByIdAndUpdate({_id: data[0]._id},{
                $set:{
                    name:req.body.fname,
                    last_name: req.body.lname,
                    city:req.body.city,
                    martial_status:req.body.marital_status,
                    phone:req.body.phone,
                    dob: date.toISOString(),
                    picture:liner2 == ""  ? data[0].picture : liner2,
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


exports.menu = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        var filter = {
            "$match": {}
        };
        if(req.body.status2 == "suspended") {
            filter["$match"]["status"] = 0;
        }else if(req.body.status2 == "active") {
            filter["$match"]["status"] = 2;
        }
      
         Menu.aggregate([
            filter,
        ]).then((data) => {
            res.render("menu", {
                user:req.session.user,
                data:data,
                status: req.body.status2,
                menu:req.session.menus
            })
        })
    }else {
        Menu.find({}).then((data) => {
            res.render("menu", {
                user:req.session.user,
                data:data,
                status: "",
                menu:req.session.menus
            })
        })
    }
}


exports.new_menu = function (req,res) {
    if (Object.keys(req.body).length > 0) {

        if(req.body._id == null || req.body._id == undefined || req.body._id == "" || req.body._id.length < 5) {
         
            var save_restura = new Menu({
                name: req.body.r_name,
                icon: req.body.r_icon,
                status: req.body.status == "active" ? 2 : 0,
            });
            save_restura.save().then((svf) => {
                if (svf) {
                  res.redirect('/menu')
                }
             })
        }else {
            Menu.findOne({_id:req.body._id}).then((r) => {
                if(r) {

                    Menu.findByIdAndUpdate({_id: r._id}, {
                            $set:{
                                name: req.body.r_name,
                                icon: req.body.r_icon,
                                status: req.body.status == "active" ? 2 : 0,
                            }
                        }).then((upd) => {
                            if(upd) {
                                res.redirect('/menu')
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
                        message: "Couldnt find the Menu"
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

exports.delete_menu = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        Menu.deleteOne({_id: req.body._id}).then(() => {
            Page.deleteMany({menu_id:new  mongoose.Types.ObjectId(req.body._id) }).then(() => {
                res.json({
                    success:true,
                    message:"Module deleted successfully"
                })
            })
         })
    }
}



exports.pages = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        var filter = {
            "$match": {}
        };
        if(req.body.status2 == "suspended") {
            filter["$match"]["status"] = 0;
        }else if(req.body.status2 == "active") {
            filter["$match"]["status"] = 2;
        }
      
         Page.aggregate([
            filter,
        ]).then((data) => {
            Menu.find({}).then((menuss) => {
            res.render("page", {
                user:req.session.user,
                data:data,
                status: req.body.status2,
                menuss:menuss,
                menu:req.session.menus
                })
            })
        })
    }else {
        Page.find({}).then((data) => {
            Menu.find().then((menuss) => {
                res.render("page", {
                    user:req.session.user,
                    data:data,
                    status: "",
                    menuss:menuss,
                    menu:req.session.menus
                })
            })
        })
    }
}


exports.new_page = function (req,res) {
    if (Object.keys(req.body).length > 0) {

        if(req.body._id == null || req.body._id == undefined || req.body._id == "" || req.body._id.length < 5) {
            console.log("the pages new save", req.body);
            Menu.findOne({_id: req.body.menu_id}).then((men) => {
                if(men) {
                    var save_restura = new Page({
                        name: req.body.r_name,
                        icon: req.body.r_icon,
                        menu_id:men._id,
                        menu_name: men.name,
                        url: req.body.url,
                        status: req.body.status == "active" ? 2 : 0,
                    });
                    save_restura.save().then((svf) => {
                        if (svf) {
                          res.redirect('/pages')
                        }
                     })
                }else {
                    res.redirect('/pages')
                }
            })
          
        }else {
            Page.findOne({_id:req.body._id}).then((r) => {
                if(r) {
                    Menu.findOne({_id: req.body.menu_id}).then((men) => {
                        if(men) {
                            Page.findByIdAndUpdate({_id: r._id}, {
                            $set:{
                                name: req.body.r_name,
                                icon: req.body.r_icon,
                                menu_id:men._id,
                                menu_name: men.name,
                                url: req.body.url,
                                status: req.body.status == "active" ? 2 : 0,
                            }
                        }).then((upd) => {
                            if(upd) {
                                res.redirect('/pages')
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
                            message: "Couldnt update"
                        })
                    }
                })

                }else {
                    res.json({
                        success: false,
                        message: "Couldnt find the Menu"
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
            res.render("course_catagories", {
                user:req.session.user,
                data:data,
                status: req.body.status2,
                menu:req.session.menus
            })
        })

    }else {
        var filter = {
            "$match": {}
        };
        if(req.session.user.role == "user") {
            filter["$match"]["user_id"] = new  mongoose.Types.ObjectId(req.session.user._id);
         }
         Catagories.find({}).then((mod) => {
                res.render("course_catagories", {
                    user:req.session.user,
                    data:mod,
                    status: "",
                    menu:req.session.menus
                })
        })
    }
}

exports.new_catagory = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        console.log("the vody is: ", req.body);
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
                type:req.body.type,
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
                                type:req.body.type,
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
                    cat:cat,
                    menu:req.session.menus
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
                    cat:cat,
                    menu:req.session.menus
                })
            })
        })
    }
   
}

exports.save_modules = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        if(req.body._id.length < 5) {
            console.log("the save body: ", req.body);
            console.log("the save body: ", req.files);
           
            var img = "";
            var liner2 = "";
            if(req.files.length > 0 ) {
                req.files.forEach( async (imagess)  => {
          
                    var url = "";
                        var image_name =tokenGenerator(29);
                        url = "./images/" + image_name + '.jpg';
                        liner2 = "images/" + image_name + '.jpg';
                   
                         Tools.uploadtos3(imagess,liner2);
                        console.log("check------------", liner2);
                        img = liner2
                  })
            }
          
            var save_modeule = new Modules({
                title: req.body.m_title,
                discription: req.body.desc,
                duration: req.body.hours + ":" + req.body.min,
                price: Number(req.body.price),
                user_id: req.session.user._id,
                catagory_id:req.body.m_cat,
                status: req.body.status == "active" ? 2 : 0,
                image:liner2
            });
    
            save_modeule.save().then((svd) => {
                if(svd) {
                    res.redirect('/modules')
                }
            })
        }else {
            var img = "";
            var liner2 = "";
            if(req.files.length > 0 ) {
                req.files.forEach( async (imagess)  => {
          
                    var url = "";
                        var image_name =tokenGenerator(29);
                        url = "./images/" + image_name + '.jpg';
                        liner2 = "images/" + image_name + '.jpg';
                   
                         Tools.uploadtos3(imagess,liner2);
                        console.log("check------------", liner2);
                        img = liner2
                  })
            }
            Modules.findByIdAndUpdate({_id: req.body._id}, {
                $set:{
                    title: req.body.title,
                    discription: req.body.desc,
                    duration: req.body.hours + ":" + req.body.min,
                    price: Number(req.body.price),
                    user_id: req.session.user._id,
                    catagory_id:req.body.m_cat,
                    catagory_id:req.body.m_cat,
                    image:liner2,
                    status: req.body.status == "active" ? 2 : 0
                }
            }).then((upd) => {
                if(upd) {
                    res.redirect('/modules')
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
        Video.find({}).then((vids) => {
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
            Modules.aggregate([filter]).then((modules) => {
                res.render("upload_videos", {
                    user:req.session.user,
                    data:vids,
                    modules:modules,
                    status: "",
                    menu:req.session.menus
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
        Video.aggregate([filter]).then((vids) => {
            Modules.aggregate([filter]).then((modules) => {
                res.render("upload_videos", {
                    user:req.session.user,
                    data:vids,
                    modules:modules,
                    status: "",
                    menu:req.session.menus
                })
            })
        })
    }
}


exports.save_video = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        console.log("the bodyyy", req.body);
        var files =  req.files;
        // console.log("the files: ", req.files);
        if(req.body._id.length < 5) {
            const groupedFiles = {};
            files.forEach(file => {
            const { fieldname } = file;
            if (groupedFiles[fieldname]) {
                groupedFiles[fieldname].push(file);
            } else {
                groupedFiles[fieldname] = [file];
            }
            }); 
            var img = "";
            var liner2 = "";
            var attachments = [];
            var vid = "/";
            if(groupedFiles.res_image.length > 0 ) {
                groupedFiles.res_image.forEach( async (imagess)  => {
                    var url = "";
                        var image_name =tokenGenerator(29);
                        url = "./images/" + image_name + '.jpg';
                        liner2 = "images/" + image_name + '.jpg';
                   
                         Tools.uploadtos3(imagess,liner2);
                        console.log("check----img--------", liner2);
                        img = liner2
                  })
            }

            if(groupedFiles.attachment && groupedFiles.attachment.length > 0 ) {
                groupedFiles.attachment.forEach( async (imagess)  => {
                    var att = "";
                    var url = "";
                    var  originalname =  imagess.originalname;
                    var extention = originalname.split(".")[1];
                        var image_name =tokenGenerator(29);
                        url = "./attachments/" + image_name + '.'+extention;
                        att = "attachments/" + image_name + '.' + extention;
                   
                         Tools.uploadtos3(imagess,att);
                        console.log("check-------attach-----", att);
                        attachments.push(att);
                  })
            }

            // if(groupedFiles.videos.length > 0 ) {
            //     groupedFiles.videos.forEach( async (imagess)  => {
            //         var url = "";
            //             var image_name =tokenGenerator(29);
            //             url = "./videos/" + image_name + '.jpg';
            //             vid = "videos/" + image_name + '.jpg';
                   
            //              Tools.upload_large_files_tos3(imagess,liner2);
            //             console.log("check----video--------", vid);
            //       })
            // }

            var save_vid = new Video({
                title: req.body.m_title,
                discription: req.body.desc,
                duration: req.body.dur,
                user_id: req.session.user._id,
                module_id: req.body.m_module,
                path:vid,
                status: req.body.status == "active" ? 2 : 0,
                thumb_img:img,
                attachments:attachments
            });
    
            save_vid.save().then((svd) => {
                if(svd) {
                    res.redirect('/upload_videos')
                }
            })

        }else {

        }
    } 
}


exports.resources = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        var filter = {
            "$match": {}
        };
        if(req.body.status2 == "suspended") {
            filter["$match"]["status"] = 0;
        }else if(req.body.status2 == "active") {
            filter["$match"]["status"] = 2;
        }
      
        Resources.aggregate([
            filter,
            {
                $lookup:{
                    from: "catagories",
                    localField: "catagory_id",
                    foreignField: "_id",
                    as: "cat"
                }
            },
            {
                $unwind: "$cat"
            },
        ]).then((data) => {
            Catagories.find({type:"resources"}).then((cat) => {
            res.render("resources", {
                user:req.session.user,
                data:data,
                status: req.body.status2,
                cat:cat,
                menu:req.session.menus
                })
            })
        })
    }else {
        Resources.aggregate([
            {
                $lookup:{
                    from: "catagories",
                    localField: "catagory_id",
                    foreignField: "_id",
                    as: "cat"
                }
            },
            {
                $unwind: "$cat"
            },

        ]).then((data) => {
            Catagories.find({type:"resources"}).then((cat) => {
                res.render("resources", {
                    user:req.session.user,
                    data:data,
                    status: "",
                    cat:cat,
                    menu:req.session.menus
                })
            })
        })
    }
}


exports.new_resources = function (req,res) {
    if (Object.keys(req.body).length > 0) {
        console.log("the body is:", req.body);
        console.log("the body files :", req.files);
        if(req.body._id == null || req.body._id == undefined || req.body._id == "" || req.body._id.length < 5) {
            var files =  req.files;
            var urls = "";
            var ext = "";
            files.forEach( async (imagess)  => {
                var att = "";
                var url = "";
                var  originalname =  imagess.originalname;
                var extention = originalname.split(".")[1];
                ext = extention;
                    var image_name =tokenGenerator(29);
                    url = "./attachments/" + image_name + '.'+extention;
                    att = "attachments/" + image_name + '.' + extention;
               
                     Tools.uploadtos3(imagess,att);
                    console.log("check-------attach-----", att);
                    urls = att;
              })

              Catagories.findOne({_id: req.body.menu_id}).then((men) => {
                if(men) {
                    var save_restura = new Resources({
                        title: req.body.r_name,
                        url:urls,
                        catagory_id:men._id,
                        desc:req.body.desc,
                        extenstion:ext,
                        created_by:req.session.user._id,
                        status: req.body.status == "active" ? 2 : 0,
                    });
                    save_restura.save().then((svf) => {
                        if (svf) {
                          res.redirect('/resources')
                        }
                     })
                }else {
                    res.redirect('/resources')
                }
            })
          
        }else {
            Resources.findOne({_id:req.body._id}).then((r) => {
                if(r) {
                    Catagories.findOne({_id: req.body.menu_id}).then((men) => {
                        if(men) {
                            var files =  req.files;
                            var urls = "";
                            var ext = "";
                            files.forEach( async (imagess)  => {
                                var att = "";
                                var url = "";
                                var  originalname =  imagess.originalname;
                                var extention = originalname.split(".")[1];
                                ext = extention;
                                    var image_name =tokenGenerator(29);
                                    url = "./attachments/resources" + image_name + '.'+extention;
                                    att = "attachments/resources" + image_name + '.' + extention;
                               
                                     Tools.uploadtos3(imagess,att);
                                    console.log("check-------attach-----", att);
                                    urls = att;
                              })

                              
                            Resources.findByIdAndUpdate({_id: r._id}, {
                            $set:{
                                title: req.body.r_name,
                                url:urls,
                                catagory_id:men._id,
                                extenstion:ext,
                                created_by:req.session.user._id,
                                status: req.body.status == "active" ? 2 : 0,
                            }
                        }).then((upd) => {
                            if(upd) {
                                res.redirect('/resources')
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
                            message: "Couldnt update"
                        })
                    }
                })

                }else {
                    res.json({
                        success: false,
                        message: "Couldnt find the catagory"
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

exports.delete_resource = async function (req,res) {
    if (Object.keys(req.body).length > 0) {
        Resources.findOne({_id:req.body._id}).then((vidss) => {
            if (vidss) {
                (async () => {
                //   const deleteee = await Tools.deleteImageFromS3(vidss.url);
                Resources.findOneAndDelete({_id:req.body._id}).then(() => {
                    res.json({
                        success:true,
                        message: "success"
                    })
                })

                })();
              } else {
                // Handle the case when vidss is falsy (e.g., not defined or null)
              }
            
        })
    }
}




AWS.config.update({
    httpOptions: {
      timeout: 600000, // Set timeout to 10 minutes (adjust as needed)
    },
  });
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
  });



exports.initiateUpload = async function  (req,res) {

    console.log("This is the firstone::",req.body);
    try {
        const { fileName } = req.body;
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: "vids/"+fileName,
        };
        const upload = await s3.createMultipartUpload(params).promise();
        res.json({ uploadId: upload.UploadId });
      } catch (error) {
        console.error("first  error: ",error);
        res.status(500).json({ success: false, message: 'Error initializing upload' });
      }
}
 
exports.upload = async function (req,res) {

    console.log("This is the Secomdddd one::",req.body);
    const { index, fileName } = req.body;
    const file = req.files;
    console.log("This is the Secomdddd one::",req.files);
    var datatt =  fs.createReadStream(file[0].path);
    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: "vids/"+fileName,
      Body: datatt,
      PartNumber: Number(index) + 1,
      UploadId: req.query.uploadId
    };
  
    s3.uploadPart(s3Params, (err, data) => {
      if (err) {
        console.log("Second part uploading", err);
        delete_uncert_data();
        return res.status(500).json({ success: false, message: 'Error uploading chunk' });
      }else {
        delete_uncert_data();
        return res.json({ success: true, message: 'Chunk uploaded successfully' });
      }
     

    
    });
}

exports.completeUpload = async function (req,res) {
    console.log("This is the last oneee::",req.body);
    console.log("This is the last oneee:: queryyy",req.query);
    const { fileName,_id } = req.query;
    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: "vids/"+fileName,
      UploadId: req.query.uploadId,
    };
  
    s3.listParts(s3Params, (err, data) => {
      if (err) {
        console.log("last part err: " + err);
        return res.status(500).json({ success: false, message: 'Error listing pa    rts' });
      }else {
        const parts = [];
        data.Parts.forEach(part => {
          parts.push({
            ETag: part.ETag,
            PartNumber: part.PartNumber
          });
        });
    
        s3Params.MultipartUpload = {
          Parts: parts
        };
    
        s3.completeMultipartUpload(s3Params, (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Error completing upload' });
          }
    
          console.log("data: ", data)
          let loc = data.Location;
              const decodedUrl = decodeURIComponent(loc);
              const parts = decodedUrl.split('/');
              const vidsIndex = parts.findIndex(part => part === 'vids');
              const desiredString = parts.slice(vidsIndex).join('/');
              console.log("the last out come is: ",desiredString);
  
              Video.findOneAndUpdate({_id: _id}, {path: desiredString}).then((vid) => {
                  if(vid) {
                      delete_uncert_data();
                      return res.json({ success: true, message: 'Upload complete', data: data.Location});
                  }else {
                      delete_uncert_data();
                      return res.json({ success: false, message: 'Upload complete', data: data.Location});
                  }
  
              })
  
         
        });
      }
    });
}


exports.delete_video = async function (req,res) {
    if (Object.keys(req.body).length > 0) {
        Video.findOne({_id:req.body._id}).then((vidss) => {
            if (vidss) {
                (async () => {
                  const deleteee = await Tools.deleteImageFromS3(vidss.path);
                  if(deleteee) {
                    Tools.deleteImageFromS3("tutoring_images/"+ vidss.thumb_img);
                    if(vidss.attachments.length > 0) {
                        for(var i = 0; i < vidss.attachments.length; i++) {
                            Tools.deleteImageFromS3("tutoring_images/"+ vidss.attachments[i]);
                        }
                    }
                    Video.deleteOne({_id:vidss._id}).then((del) => {
                        if(del) {
                            console.log("success full delete a image")
                            res.json({
                                success:true,
                                message: "success"
                            })
                        }else {
                            console.log("failur ")
                            res.json({
                                success:false,
                                message: "error"
                            })
                        }
                    })
                  }else {
                    console.log("failur ")
                    res.json({
                        success:false,
                        message: "error"
                    })
                  }

                })();
              } else {
                // Handle the case when vidss is falsy (e.g., not defined or null)
              }
            
        })
    }
}



exports.qr_validation = async function (req,res) {
    console.log("Calledd---------------------", req.body);
    if (Object.keys(req.body).length > 0) {
        Qr_code_session.findOne({session_id:  req.body.session_id, random_number: req.body.num}).then((found) => {
            if(found) {
                User.findOne({_id: req.body.user_id}).then((user) => {
                    if(user) {
                        Qr_code_session.findByIdAndUpdate({_id:found._id}, {
                            $set: {
                                user_id:user._id,
                                logged_in:true
                            }
                        }).then((logged) => {
                            res.json({
                                success:true,
                                message: "Successfully logged in"
                            }) 
                        })
                    }else {
                        res.json({
                            success:false,
                            message: "No user found"
                        })
                    }
                })
            }else {
                res.json({
                    success:false,
                    message: "No session found"
                })
            }
        })
    }else {
        res.json({
            success:false,
            message: "No data found"
        })
    }
}


exports.auth_user = async function (req,res) {
    console.log("the could to log him im: ", req.sessionID);
    Qr_code_session.findOne({session_id: req.sessionID, logged_in: true, user_id: {$ne: null}}).then((found) => {
        if(found) {
            User.findOne({_id:found.user_id}).then((user) => {
                if(user) {
                    console.log("LOGGGED INNNNNN")
                    Page.aggregate([
                        {
                            $lookup:{
                                from: "menus",
                                localField: "menu_id",
                                foreignField: "_id",
                                as: "menu"
                            }
                        },
                        {
                            $unwind: "$menu"
                        },
            
                                {
                                    $group:{ 
                                        _id:"$menu._id",
                                        menu_name: { $last:"$menu.name"},
                                        menu_icon: { $last:"$menu.icon"},
                                        page:{
                                            $push:{
                                            page_id:"$_id",
                                            page_name:"$name",
                                            page_url:"$url" ,
                                            page_icon: "$icon"
                                     
                                            }
                                            }
                                        }
                                    
                                    },
                                {
                                    $sort:{_id:1}
                                }
            
                    ]).then((pages) => {
                        req.session.user = user;
                        req.session.menus = pages;
                        res.json({
                            success:true,
                            message: "No user found"
                        })
                    })
                   

                }else {
                    res.json({
                        success:false,
                        message: "No user found"
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message: "No logged in"
            })
        }
    })
}



function delete_uncert_data() {

    const folderPath = './uploads'; 
    fs.emptyDir(folderPath, (error) => {
        if (error) {
          console.error(error);
          // Handle the error appropriately
        } else {
          console.log('Folder contents deleted successfully');
        }
      });
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

  

  function generateRandomNumber() {
    const min = 1000000000; // 10-digit number starts with 1
    const max = 9999999999; // 10-digit number ends with 9
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
