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
            Modules.find({status:{$gt: 1}}).sort({likes: -1}).limit(4).then((course) => {
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
                        _id:  new  mongoose.Types.ObjectId(req.body.course_id)
                    }
                },
                
            ])
        }else {
            res.json({
                success:false,
                message: "Couldnt find user try login again"
            })
        }
    })
}
