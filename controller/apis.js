const User = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Modules = require('../model/modules');
const Video = require('../model/video');
const Catagories = require('../model/catagory')
const Bought_course = require('../model/bought_course')
const saltRounds = 10;
const fs            = require('fs-extra')
const mongoose = require('mongoose');
const Tools  = require('../tools.js');
const AWS = require('aws-sdk');
require('dotenv').config();
const multer = require('multer');



exports.get_cat = function (req,res) {
    console.log("yep the route that the app is calling is CORRECT")
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            Catagories.find({status:{$gt: 1}}).then((cat) => {
                if(cat.length > 0) {
                    console.log("reached herer ",cat.length);
                    res.json({
                        success:true,
                        message: "Successfuly found the data",
                        record: {
                            data:cat
                        }
                    })
                }else {
                    console.log("NOOOOOOOOOOOOOOO cat");
                    res.json({
                        success:false,
                        message: "Couldnt find the data",
                        record: {
                            data:[]
                        }
                    })
                }
            })
        }else {
            console.log("the user does not exits");
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}

exports.top_mentors = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            Modules.aggregate([
                {
                    $group: {
                        _id: "$user_id",
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 4
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $project: {
                        _id: "$user._id",
                        name: "$user.name",
                        moduleCount: "$count"
                    }
                }
            
            ]).then((mentors) => {
                if(mentors.length > 0) {
                    res.json({
                        success:true,
                        message: "Successfuly found the data",
                        record: {
                            data:mentors
                        }
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}

exports.get_selected_cat = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            var arr1 = req.body._ids;
            var ids = [];
            arr1.forEach(function(item) {
                
                ids.push( new  mongoose.Types.ObjectId(item));
              });
            Catagories.find({status:{$gt: 1}, _id: {$in: ids}}).then((cat) => {
                if(cat) {
                    res.json({
                        success:true,
                        message: "Successfuly found the data",
                        record: {
                            data:cat
                        }
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}

exports.trending_course = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) { 
            var limit_query = {
                $limit: 1000,
            };
            if (req.body.limit == "yes") {
                limit_query["$limit"] = 4;
            }
            var filter = {
                $match: {},
            };
            if(req.body.cat != "" && req.body.cat != undefined && req.body.cat  != null ) {
                filter["$match"]["catagory_id"]  =  new mongoose.Types.ObjectId(req.body.cat)
               
            }
            Modules.aggregate([
                {
                    $match: {
                        status:{$gt: 1},
                    }
                } ,
                filter,
                {
                    $lookup:{
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "mentor"
                    }
                },
                {
                    $unwind: "$mentor"
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
                } ,
                {
                    $sort: {
                        likes:-1
                    }
                },
                limit_query
            ]).then((course) => {
                if(course.length > 0) {
                    res.json({
                        success:true,
                        message: "Successfuly found the data",
                        record: {
                            data:course
                        }
                    })
                }else {
                    res.json({
                        success:false,
                        message: "Couldnt find any course wait for upload"
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}

exports.similar_course = function (req,res) {
    
    console.log("000000000000000000", req.body);
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            console.log("11111111111");
            Modules.findOne({_id:req.body.cat_id }).then((sim) => {
                if(sim) {
                    console.log("222222222");
                    Modules.find({status:{$gt: 1}, catagory_id:sim.catagory_id}).sort({likes: -1}).then((course) => {
                        if(course.length > 0) {
                            console.log("found coursd");
                            res.json({
                                success:true,
                                message: "Successfuly found the data",
                                record: {
                                    data:course
                                }
                            })
                        }else {
                            res.json({
                                success:false,
                                message: "Couldnt find any course wait for upload"
                            })
                        }
                    })
                }else{
                    res.json({
                        success:false,
                        message: "Couldnt find any course wait for upload"
                    }) 
                }
            })
       
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    }) 
}

exports.all_trending_course = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            Modules.find({status:{$gt: 1}}).sort({likes: -1}).then((course) => {
                if(course.length > 0) {
                    res.json({
                        success:true,
                        message: "Successfuly found the data",
                        record: {
                            data:course
                        }
                    })
                }else {
                    res.json({
                        success:false,
                        message: "Couldnt find any course wait for upload"
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}


exports.get_top_mentors = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            User.find({}).sort({likes: -1}).limit(5).then((course) => {
                if(course.length > 0) {
                    res.json({
                        success:true,
                        message: "Successfuly found the data",
                        record: {
                            data:course
                        }
                    })
                }else {
                    res.json({
                        success:false,
                        message: "Couldnt find any course wait for upload"
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}

exports.get_selected_course = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            console.log("the is lists of_ids", req.body);
            var idsString = req.body._ids;

            if(idsString.length > 10) {
            var idValues = idsString.substring(1, idsString.length - 1).split(', ');
            var formattedIds = idValues.map(id => new mongoose.Types.ObjectId(id));
            Modules.find({ status: { $gt: 1 }, _id: { $in: formattedIds } }).then((cat) => {
                if (cat.length > 0) {
                    res.json({
                        success: true,
                        message: "Successfully found the data",
                        record: {
                            data: cat
                        }
                    });
                }
            });
            }else {
                res.json({
                    success:false,
                    message: "Couldnt find any course"
                })
            }
         
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}

exports.get_course_details = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            Modules.aggregate([
                {
                    $match: {
                        _id: new  mongoose.Types.ObjectId(req.body.course_id)
                    }
                },
                {
                  $lookup: {
                    from: "videos",
                    localField: "_id",
                    foreignField: "module_id",
                    as: "videos"
                  }
                },
                {
                  $project: {
                    _id: 1,
                    title: 1,
                    discription:1,
                      image:1,
                      likes:1,
                      videos:1,
                      amount:"$price",
                      
                    no_of_vids: { $size: "$videos" },
                    total_duration: {
                      $reduce: {
                        input: "$videos",
                        initialValue: 0,
                        in: { $add: ["$$value", "$$this.duration"] }
                      }
                    },
                    attachments_count: {
                      $sum: { $map: { input: "$videos.attachments", as: "attach", in: { $size: "$$attach" } } }
                    }
                  }
                }
              ]).then((data) => {
                if(data.length > 0) {
                    Bought_course.findOne({user_id:user._id, module_id: new  mongoose.Types.ObjectId(req.body.course_id)}).then((bought) => {
                        if(bought) {
                            res.json({
                                success:true,
                                message: "Successfuly found the data",
                                record: {
                                    data:data,
                                    bought:true
                                }
                            })
                        }else{
                            res.json({
                                success:true,
                                message: "Successfuly found the data",
                                record: {
                                    data:data,
                                    bought:false
                                }
                            })
                        }
                    })
                  
                }else {
                    res.json({
                        success:false,
                        message: "Couldnt any data"
                    })
                }
              })
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}


exports.get_vid_details = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            console.log("the vids", req.body);
            Video.aggregate([
                {
                    $match: {
                        _id: new  mongoose.Types.ObjectId(req.body.vid_id)
                    }
                },
                {
                    $lookup:{
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "mentor"
                    }
                },
                {
                    $unwind: "$mentor"
                },

            ]).then((vid) => {
                console.log("the vids", vid.length);
                if(vid.length > 0) {
                    res.json({
                        success:true,
                        message: "Successfuly found the data",
                        record: {
                            data:vid
                        }
                    })
                }else {
                    res.json({
                        success:false,
                        message: "Couldnt find any lesson try again"
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}

exports.buy_course = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            Modules.findOne({_id:req.body.course_id, status: {$gt:1}}).then((mod) => {
                if(mod) {
                    if(mod.price == Number(req.body.amount)) {
                        Bought_course.findOne({user_id:user._id,module_id:mod._id}).then((already_bought) => {
                            if(!already_bought) {
                                var buy = new Bought_course({
                                    title: mod.title,
                                    user_name:user.user_name,
                                    price: Number(req.body.amount),
                                    user_id:user._id,
                                    module_id:mod._id
                                })
                                buy.save().then((svd) => {
                                    if(svd) {
                                        res.json({
                                            success:true,
                                            message:"Congratulation you have Successfully Bought this course"
                                        })
                                    }else {
                                        res.json({
                                            success:false,
                                            message:"Something went wrong Contact your Admin"
                                        })
                                    }
                                })
                            }else {
                                res.json({
                                    success:false,
                                    message:"You already bought this course"
                                })
                            }
                        })
                    }else {
                        res.json({
                            success:false,
                            message:"The paid amount and the module amount dont match"
                        })
                    }
                }else {
                    res.json({
                        success:false,
                        message:"couldnt find the course"
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message:"User does not exits"
            })
        }
    })
}

exports.ongoing_and_completed_course = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            var state = req.body.state == "comp" ? 1: 0;
            Bought_course.aggregate([

                {
                    $match: {user_id:user._id, completd_course:state }
                },
                {
                    $lookup:{
                        from: "modules",
                        localField: "module_id",
                        foreignField: "_id",
                        as: "course"
                    }
                },
                {
                    $unwind: "$course"
                },
            ]).then((course) => {
                if(course.length > 0) {
                    res.json({
                        success:true,
                        record: {
                            data:course
                        }
                    })
                }else {
                    res.json({
                        success:false,
                        record:{
                            data:[]
                        },
                        message: "No ongoing course found"
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}

exports.change_to_completd = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            Video.findOne({_id:req.body.vid_id}).then((vid) => {
                if(vid) {
                    Bought_course.findOne({user_id:user._id, module_id: vid.module_id}).then((bought_vid) => {
                        if(bought_vid) {
                            Bought_course.findOneAndUpdate({_id:bought_vid._id}, { $set:{completd_course: 1}}).then((updt) => {
                                if(updt) {
                                    res.json({
                                        success:true,
                                        message:"Congratuation on completing this course"
                                    })
                                }else {
                                    res.json({
                                        success:false,
                                        message:"Couldnt find any course to update try again"
                                    })
                                }
                            })
                        }else {
                            res.json({
                                success:false,
                                message:"Couldnt find any course to update try again"
                            })
                        }
                    })
                }else {
                    res.json({
                        success:false,
                        message:"Couldnt find any video please try again"
                    })
                }
            })
        }else {
            res.json({
                success:false,
                message:"User does not exits"
            })
        }
    })
}
