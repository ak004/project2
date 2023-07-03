const S3 = require('aws-sdk/clients/s3');
const fs            = require('fs-extra')
const AWS = require('aws-sdk');
require('dotenv').config();


 function  uploadtos3(file,name) {
  console.log("the filee",file);
  console.log("the orginal sname",file.originalname);
  var the_namewithextenstion =  "tutoring_images/"+file.originalname;
//   const accesskey = process.env.ACCESS_KEY
// const secret = process.env.SECRET_KEY
// const region = process.env.REGION
// const buket_name = process.env.BUCKET_NAME

 

var datatt =  fs.createReadStream(file.path);
 
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  
});
AWS.config.update({region:'eu-north-1'});
var s3 = new AWS.S3();
var params = {
  Bucket: process.env.BUCKET_NAME, // pass your bucket name
  Key: "tutoring_images/"+name,
  Body: datatt
};
s3.putObject(params, function (err, data) {
  if (err) {
      console.log("Error uploading data: ", err);
      return "";
  }else {
    delete_uncert_data();
    return the_namewithextenstion;
  }
});


  }


  function getStreamImage(filekey) {
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      
    });
    AWS.config.update({region:'eu-north-1'});
    var s3 = new AWS.S3();

    const downloadParmams = {
      Key:filekey,
      Bucket: "mascuud-bucket",
    }

    return  s3.getObject(downloadParmams).createReadStream();

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

 


exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
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

  
  exports.uploadtos3 = uploadtos3;
  exports.getStreamImage = getStreamImage;