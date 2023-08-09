const S3 = require('aws-sdk/clients/s3');
const fs            = require('fs-extra')
const AWS = require('aws-sdk');
require('dotenv').config();
const { Upload } = require("@aws-sdk/lib-storage");
const { S3Client } = require("@aws-sdk/client-s3")


const s3 = new S3Client({
	region: process.env.REGION,
	credentials: {
		accessKeyId: process.env.ACCESS_KEY,
		secretAccessKey: process.env.SECRET_KEY,
	},
});



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
    console.log("uplaoding........");
    return the_namewithextenstion;
  }
});


  }

  async function deleteImageFromS3(imagePath) {
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Key: imagePath,
    };
  
    try {
      AWS.config.update({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        
      });
      AWS.config.update({region:'eu-north-1'});
      var s3 = new AWS.S3();

      AWS.config.update({region:'eu-north-1'});
      var s3 = new AWS.S3();
      //  s3.DeleteObject(params).promise();
       s3.deleteObject(params, function (err, data) {
        if(err) {
          return false;
        }else {
          return true;
        }
       })
      console.log("Object deleted successfully");
      return true; // Indicate success
    } catch (err) {
      console.log("Error deleting object: ", err);
      return false; // Indicate failure
    }
  }


  function upload_large_files_tos3(file,name) {
    // params for s3 upload
    var datatt =  fs.createReadStream(file.path);
    const params = {
     Bucket: "mascuud-bucket",
     Key: "tutoring_images/vids/"+`${Date.now().toString()}_${file.originalname}`,
     Body: datatt,
    }
   // done few commit done and fixed 
    try {
     // upload file to s3 parallelly in chunks
     // it supports min 5MB of file size
     const uploadParallel = new Upload({
      client: s3,
      queueSize: 4, // optional concurrency configuration
      partSize: 5542880, // optional size of each part
      leavePartsOnError: false, // optional manually handle dropped parts
      params,
     })
   
     // checking progress of upload
     uploadParallel.on("httpUploadProgress", progress => {
      console.log(progress)
     })
   
     // after completion of upload
     uploadParallel.done().then(data => {
      console.log("upload completed!", { data })
      return res.json({ success: true, data: data.Location })
     })
    } catch (error) {
     res.send({
      success: false,
      message: error.message,
     })
    }
  }


  function getStreamImage(filekey) {
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      
    });
    // AWS.config.update({region:'eu-north-1'});
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
  exports.upload_large_files_tos3 = upload_large_files_tos3;
  exports.deleteImageFromS3 = deleteImageFromS3;