const User = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const saltRounds = 10;

require('dotenv').config();

console.log("the checking is: ",);

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
        console.log("There is an error: ", error1);
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
         console.log("the bodyy", req.body);
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
                            console.log("the hashh is", hash);
                            console.log(req.body);
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
    console.log("______", req.body);
}