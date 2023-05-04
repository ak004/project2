const User = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const saltRounds = 10;
const sgMail = require('@sendgrid/mail');
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;
sgMail.setApiKey("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");





exports.home = function (req,res) {
    res.render("index", {
        test:"testt"
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
            message: 'Login successful'
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
    console.log("theher::::",process.env.SENDGRID_API_KEY );

    console.log("the email is", req.body);
    // Generate a verification number
const verificationNumber = Math.floor(100000 + Math.random() * 900000);

 // Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

sendSmtpEmail = {
    to: [{
        email: req.body.email,
        name: req.body.email
    }],
    templateId: 59,
    params: {
        name: 'John',
        surname: 'Doe'
    },
    headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
    }
};

apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

}


exports.blank = function (req,res) {
    res.render("blank_page", {
        test:"testt"
    })
}