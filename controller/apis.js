const User = require('../model/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Modules = require('../model/modules');
const Video = require('../model/video');
const Catagories = require('../model/catagory')
const saltRounds = 10;
const fs            = require('fs-extra')
const mongoose = require('mongoose');
const Tools  = require('../tools.js');
const AWS = require('aws-sdk');
require('dotenv').config();
const multer = require('multer');



exports.get_cat = function (req,res) {
    User.findOne({ _id:req.body.user_id}).then((user) => {
        if(user) {
            Catagories.find({status:{$gt: 1}}).then((cat) => {
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
            Modules.aggregate([
                {
                    $match: {
                        status:{$gt: 1}
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
                {
                    $limit:  4
                }
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
            var arr1 = req.body._ids;
            var ids = [];
            arr1.forEach(function(item) {
                
                ids.push( new  mongoose.Types.ObjectId(item));
              });
              Modules.find({status:{$gt: 1}, _id: {$in: ids}}).then((cat) => {
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
                    res.json({
                        success:true,
                        message: "Successfuly found the data",
                        record: {
                            data:data
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
