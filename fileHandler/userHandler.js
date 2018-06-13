
//     notification = require('./notification.js'),
//     forEach = require('async-foreach').forEach,
//     packages = require('../models/package.js'),
//     multer = require('multer'),
//     multiparty = require('multiparty'),
//     boostPurchases = require('../models/boost-purchases'),
//     referral = require('../models/referral'),
//     apn = require('apn'),
//     cron = require('node-cron');
// premiumAccount = require('../models/premiumAccount');
// inviteFriend = require('../models/inviteFriend.js')
// var moment = require('moment');
// let upload = multer().array('temp');



const mongoose = require('mongoose')
const cloudinary = require('cloudinary')
const async = require('async')
const commonFile = require('./commonFile.js')
const jwt = require('jsonwebtoken')
const config = require('../config/config-dev.js')
const pagination = require('pagination')
const admin = require('../models/admin.js')
const user = require('../models/user.js')
const product = require('../models/product.js')
const transaction = require('../models/product-transaction')
var randomstring = require("randomstring")

// const stripe = require("stripe")("sk_test_0vKQEflQAPi2Mr9JmWYUtfmx")
// stripe.charges.retrieve("ch_1CcUppHqVoUdg7uTIGTiT9bN", 
//     {
//         api_key: "sk_test_0vKQEflQAPi2Mr9JmWYUtfmx"
//   });

// Create a payment from a test card token.
// const charge = await stripe.charges.create({
//   amount: 2000,
//   currency: 'usd',
//   source: 'tok_amex',
//   description: 'My first payment'
// });





    module.exports = {

        //  api calls internally when user hit any piiverify token 
        verifyToken: (req, res, next) => {
            console.log("req.headers.jwt-=========>>>>",req.headers.jwt)
            if (req.headers.jwt == "null" || req.headers.jwt == "" || req.headers.jwt == "undefined" || req.headers.jwt == null || req.headers.jwt == undefined) {
                return commonFile.responseHandler(res, 400, "Token Missing")
            }
            jwt.verify(req.headers.jwt, config.jwtSecretKey, (err, decoded) => {
                console.log("verify token",decoded)
                if (err) {
                    return commonFile.responseHandler(res, 403, "Token Invalid", err)
                } else {
                    next();
                }
            })
        },



       
        // @@@@@@@@@@@@@@@@@@@@@@@  login Api through email id or userName  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        // login: (req, res) => {
        //     console.log("req.body========>>>>",req.body)
        //     if (!(req.body.userName || req.body.email) || !req.body.deviceType || !req.body.password || !req.body.deviceToken) {
        //         return commonFile.responseHandler(res, 400, "Parameters missing.")
        //     }
        //     let query = {}
        //     if(req.body.email){
        //         query.email = req.body.email
        //     }
        //     if(req.body.userName){
        //         query.userName = req.body.userName
        //     }
        //     let update = {
        //         deviceType:req.body.deviceType,
        //         deviceToken:req.body.deviceToken
        //     }
        //     user.findOneAndUpdate(query, update, {new:true}).lean().exec((err, firstResult) => {
        //         if (err)
        //             return commonFile.responseHandler(res, 400, "Internal Server Error.")
        //         else if (!firstResult) {
        //             if(req.body.email){
        //                 return commonFile.responseHandler(res, 409, "Email id doe's not exits.")
        //             }
        //             if(req.body.userName){
        //                 return commonFile.responseHandler(res, 409, "Username doe's not exits.")
        //             }
                    
        //         }
        //         else{
                    
        //             if(firstResult.status === "BLOCKED"){
        //                 return commonFile.responseHandler(res, 409, "User has been blocked by admin.")
        //             }
        //             if(firstResult.status === "INACTIVE"){
        //                 return commonFile.responseHandler(res, 401, "Please Complete Your Profile.")
        //             }
        //             else{
        //                 commonFile.compareHash(req.body.password, firstResult.password, (resultHash)=>{
        //                     if(resultHash == true){
        //                         let token = jwt.sign({
        //                             _id: firstResult._id
        //                         }, config.jwtSecretKey, {
        //                             expiresIn: '1000s'
        //                         })
        //                         delete firstResult.password
        //                         firstResult["jwtToken"] = token
        //                         return commonFile.responseHandler(res, 200, "Successfully login", firstResult)
        //                     }
        //                     else{
        //                         return commonFile.responseHandler(res, 409, "Invalid Password")
        //                     }
        //                 })  
        //             }
        //         }
        //     })
        // },


        login: (req, res) => {
            console.log("req.body========>>>>",req.body)
            if (!req.body.email || !req.body.deviceType || !req.body.password || !req.body.deviceToken) {
                return commonFile.responseHandler(res, 400, "Parameters missing.")
            }
            let update = {
                deviceType:req.body.deviceType,
                deviceToken:req.body.deviceToken
            }
            user.findOneAndUpdate({email:req.body.email}, update, {new:true}).lean().exec((err, emailResult)=>{
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal Server Error.",err)
                else if (emailResult){

                    if(emailResult.status === "BLOCKED"){
                        return commonFile.responseHandler(res, 404, "User has been blocked by admin.")
                    }
                    else{
                        commonFile.compareHash(req.body.password, emailResult.password, (resultHash)=>{
                            if(resultHash == true){
                                let token = jwt.sign({
                                    _id: emailResult._id
                                }, config.jwtSecretKey)
                                delete emailResult.password
                                emailResult["jwtToken"] = token
                                if(emailResult.status === "INACTIVE"){
                                    return commonFile.responseHandler(res, 401, "Please Complete Your Profile.", emailResult)
                                }
                                if(emailResult.status === "ACTIVE"){
                                    return commonFile.responseHandler(res, 200, "Successfully login", emailResult)
                                }
                            }
                            else{
                                return commonFile.responseHandler(res, 409, "Invalid Password")
                            }
                        })  
                    }
                }
                else{
                    user.findOneAndUpdate({userName:req.body.email}, update, {new:true}).lean().exec((err, userNameResult)=>{
                        if (err)
                            return commonFile.responseHandler(res, 400, "Internal Server Error.")
                        else if (userNameResult) {
        
                            if(userNameResult.status === "BLOCKED"){
                                return commonFile.responseHandler(res, 409, "User has been blocked by admin.")
                            }
                            else{
                                commonFile.compareHash(req.body.password, userNameResult.password, (resultHash)=>{
                                    if(resultHash == true){
                                        let token = jwt.sign({
                                            _id: userNameResult._id
                                        }, config.jwtSecretKey)
                                        console.log("jwt Token=============>>>",token)
                                        delete userNameResult.password
                                        userNameResult["jwtToken"] = token
                                        if(userNameResult.status === "INACTIVE"){
                                            return commonFile.responseHandler(res, 401, "Please Complete Your Profile.", userNameResult)
                                        }
                                        if(userNameResult.status === "ACTIVE"){
                                            return commonFile.responseHandler(res, 200, "Successfully login", userNameResult)
                                        }
                                    }
                                    else{
                                        return commonFile.responseHandler(res, 409, "Invalid Password")
                                    }
                                })  
                            }
                        }
                        else{
                            return commonFile.responseHandler(res, 409, "Your Credential is invalid")
                        }
                    })
                }
            })
        },



        // @@@@@@@@@@@@@@@@@@@@@@@  Signup Api through email id and userName  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        signup: (req, res) => {
            console.log("req.body========>>>>",req.body)
            if (!req.body.name || !req.body.email || !req.body.password || !req.body.age || !req.body.userName || !req.body.deviceType || !req.body.deviceToken) {
                return commonFile.responseHandler(res, 400, "Parameter missing.")
            }
            user.findOne({ userName: req.body.userName }, (err, firstResult) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal Server Error.")
                else if (firstResult)
                    return commonFile.responseHandler(res, 409, "user name already taken.")
                else {

                    user.findOne({ email: req.body.email }, (err, secondResult) => {
                        if (err)
                            return commonFile.responseHandler(res, 400, "Internal Server Error.")
                        else if (secondResult)
                            return commonFile.responseHandler(res, 409, "Enail id already Regisetered.")
                        else {
                            commonFile.createHash(req.body.password, (err, password)=>{
                                if(err)
                                    console.log(err)
                                else{
                                    console.log("password====>>>",password)
                                    req.body.password = password
                                    new user(req.body).save((err, result) => {
                                        if (err)
                                            return commonFile.responseHandler(res, 400, "Internal Server Error.")
                                        else{
                                            
                                            let token = jwt.sign({
                                                _id: result._id
                                            }, config.jwtSecretKey)
                                            console.log("jwt Token=============>>>",token)
                                            user.findById({_id:result._id}).lean().exec((err, finalResult)=>{
                                                if (err)
                                                    return commonFile.responseHandler(res, 400, "Internal Server Error.")
                                                else{
                                                    delete finalResult.password
                                                    finalResult["jwtToken"] = token
                                                    return commonFile.responseHandler(res, 200, "You have successfully signup.", finalResult)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },




        // @@@@@@@@@@@@@@@@@@@@@@@  forgotPassword Api through email and generate OTP and also resend OTP  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        forgotPassword: (req, res) => {
            console.log("req.body========>>>>",req.body)
            if (!req.body.email) {
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }
            var random = randomstring.generate(7);
            user.findOneAndUpdate({ email:req.body.email }, {otp:random}, {new:true}, (err, result) => {
                if (err)
                    commonFile.responseHandler(res, 400, "Internal Server Error.",err)
                else if (result) {
                    commonFile.sendEmail(req.body.email, "OTP for change password", "Your One Time Passsword is" , random , null, null, (result) => {
                        if (result)
                            return commonFile.responseHandler(res, 200, "OTP Successfully Sent on your Email id.");
                        else
                            return commonFile.responseHandler(res, 400, "OTP not sent. Please try again.");
                    })
                } 
                else
                    return commonFile.responseHandler(res, 409, "Email Id not registered.")
            })
        },

         
        
        // @@@@@@@@@@@@@@@@@@@@@@@  verifyOTP Api through email to verify the OTP  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        verifyOTP:(req,res)=>{
            console.log("req.body========>>>>",req.body)
            if (!req.body.email || !req.body.otp) {
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }
            user.findOne({ email:req.body.email }, (err, result) => {
                if (err)
                    commonFile.responseHandler(res, 400, "Internal Server Error.",err)
                else if (result) {
                    
                    if(result.otp === req.body.otp){
                        return commonFile.responseHandler(res, 200, "OTP Successfully Match.");
                    }
                    else{
                        return commonFile.responseHandler(res, 400, "Sorry! Invalid OTP.");
                    }
                } 
                else
                    return commonFile.responseHandler(res, 400, "User not found.")
            })
            
        },




        // @@@@@@@@@@@@@@@@@@@@@@@  changePassword Api through email or userId to verify the OTP  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        changePassword: (req, res) => {
            console.log("req.body========>>>>",req.body)
            if ( !(req.body.email || req.body.userId) || !req.body.password) {
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }
            let query = {}
            if(req.body.userId){
                query._id = req.body.userId 
            }
            if(req.body.email){
                query.email = req.body.email
            }
            commonFile.createHash(req.body.password, (err, result) => {
                if (err) {
                    console.log("Error in creating hash reset password api", err)
                } 
                else {
                    user.findOneAndUpdate(query, { password: result }, { new:true }, (err, final) => {
                        if (err)
                            return commonFile.responseHandler(res, 400, "Internal Server Error.")
                        else if (final) {
                            return commonFile.responseHandler(res, 200, "Password Successfully Chnaged.")
                        } 
                        else {
                            return commonFile.responseHandler(res, 400, "User not found.")
                        }
                    })
                }
            })
        },




        // @@@@@@@@@@@@@@@@@@@@@@@  completeProfileSetup Api   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        completeProfileSetup:(req,res)=>{
            console.log("req.body========>>>>",req.body)
            if( !(req.body.email || req.body.userId) || !req.body.bodyType || !req.body.gender || !req.body.height || !req.body.weight){
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }
            let query = { _id:req.body.userId }
            let update = { status:"ACTIVE" }

            if(req.body.gender){
                update.gender = req.body.gender
            }
            if(req.body.height){
                update.height = req.body.height
            }
            if(req.body.weight){
                update.weight = req.body.weight
            }
            if(req.body.bodyType){
                update.bodyType = req.body.bodyType
            }

            async.waterfall([(callback)=>{
                if(req.body.selfie){
                    commonFile.imageUploadToCloudinary(req.body.selfie, (url)=>{
                        if (url != undefined) {
                            update.selfie = url
                            callback(null, "done")
                        } 
                        else
                            return commonFile.responseHandler(res, 400, "Url cannot be obtained.")
                    })
                }
                else{
                    callback(null, "! Image")
                }
            }, (next, callback)=>{
                user.findOneAndUpdate(query, update, { new:true }).select('-password').exec((err, final) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error.")
                    else if (final) {
                        callback(null, final)
                    } 
                    else {
                        return commonFile.responseHandler(res, 400, "User not found.")
                    }
                })
            }],(err, finalResult)=>{
                if(finalResult)
                    return commonFile.responseHandler(res, 200, "Profile Successfully Completed.", finalResult)
            } )
        },




         // @@@@@@@@@@@@@@@@@@@@@@@  userDetail Api to show the Detail of the user   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        userDetail:(req, res)=>{
            console.log("req.body========>>>>",req.body)
            if(!req.body.userId){
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }

            let query = { _id:req.body.userId }
            
            user.findOne(query).select('-password').exec((err, final) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal Server Error.")
                else if (final){
                    return commonFile.responseHandler(res, 200, "Success.", final)
                }
                else
                    return commonFile.responseHandler(res, 400, "User not found.")
            })

        },



        // @@@@@@@@@@@@@@@@@@@@@@@  updateUserDetail Api to update Detail of the user   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        updateUserDetail:(req, res)=>{
            console.log("req.body========>>>>",req.body)
            if( !req.body.userId){
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }

            let query = { _id:req.body.userId }

            let update = {}

            if(req.body.userName){
                update.userName = req.body.userName
            }
            if(req.body.age){
                update.age = req.body.age
            }
            if(req.body.email){
                update.email = req.body.email
            }
            if(req.body.height){
                update.height = req.body.height
            }
            if(req.body.weight){
                update.weight = req.body.weight
            }
            if(req.body.bodyType){
                update.bodyType = req.body.bodyType
            }

            async.waterfall([(callback)=>{

                if(req.body.email){

                    user.find({ _id:{$ne:req.body.userId }}, (err, emailResult) => {
                        if (err)
                            return commonFile.responseHandler(res, 400, "Internal Server Error.")
                        else if (emailResult) {
                                var index = -1
                                index = emailResult.findIndex((x)=> x.email === req.body.email)
                                if(index != -1){
                                    return commonFile.responseHandler(res, 200, "Email ID already exits.")
                                }
                                else{
                                    callback(null, "done")
                                }
                            
                        } 
                        else {
                            callback(null, "done")
                        }
                    })
                }
                else{
                    callback(null, "done")
                }
            }, (next, callback)=>{
                
                if(req.body.selfie){
                    commonFile.imageUploadToCloudinary(req.body.selfie, (url)=>{
                        if (url != undefined) {
                            update.selfie = url
                            callback(null, "done")
                        } 
                        else
                            return commonFile.responseHandler(res, 400, "Url cannot be obtained.")
                    })
                }
                else{
                    callback(null, "done")
                }
            }, (next, callback)=>{
                user.findOneAndUpdate(query, update, { new:true }).select('-password').exec((err, final) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error.")
                    else if (final) {
                        callback(null, final)
                    } 
                    else {
                        return commonFile.responseHandler(res, 400, "User not found.")
                    }
                })

            }], (err, finalResult)=>{
                if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error.")
                else if (finalResult)
                    return commonFile.responseHandler(res, 200, "Profile Successfully Updated.", finalResult)
                else
                    return commonFile.responseHandler(res, 400, "User not found.")
            })
        },


        // @@@@@@@@@@@@@@@@@@@@@@@  likeUnlikeProduct Api  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        likeUnlikeProduct: (req, res) => {
            console.log("req.body========>>>>",req.body)
            if (!req.body.productId || !req.body.userId || !req.body.requestType) {
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }
            
            let update = {}
            let query = { _id:req.body.userId }

            if ((req.body.requestType).toLowerCase() === "like") {
                update = {
                    $push: {
                        myFavourite: {
                            product: req.body.productId
                        }
                    }
                }

            }
            else if ((req.body.requestType).toLowerCase() === "unlike") {
                update = {
                    $pull: {
                        myFavourite: {
                            product: req.body.productId
                        }
                    }
                }

            } 
            else {
                return commonFile.responseHandler(res, 400, "Invalid request type.");
            }

            async.waterfall([(callback) => {
                user.findByIdAndUpdate(query, update, { new:true }, (err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.");
                    else if(!result)
                        return commonFile.responseHandler(res, 400, "User not found.")
                    else
                        callback(null, result)
                })

            }], (err, result) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.")
                else{
                    if ((req.body.requestType).toLowerCase() === "like") {
                        return commonFile.responseHandler(res, 200, "You have successfully like this product");
                    }
                    if ((req.body.requestType).toLowerCase() === "unlike") {
                        return commonFile.responseHandler(res, 200, "You have successfully unlike this product");
                    } 
                }
            })

        },



        

        // @@@@@@@@@@@@@@@@@@@@@@@  myFavourite Api to show favourite product List @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

        myFavourite: (req, res) => {
            console.log("req.body========>>>>",req.body)

            let n = req.body.page || 1
            let m = req.body.limit || 10

            if (!req.body.userId) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }

            let query = { _id: mongoose.Types.ObjectId(req.body.userId), status: "ACTIVE" }

            async.waterfall([(callback)=>{
                
                user.findById(query).populate('myFavourite.product').exec((err, firstResult)=>{
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error.")
                    else if (!firstResult)
                        return commonFile.responseHandler(res, 409, "User not found.")
                    else{

                        if (firstResult.subscriptionPeriod) {
                            if (Date.now() - firstResult.subscriptionPeriod >= 0) {
                                let i = 0
                                let array = []
                                do{ 
                                    array[i] = firstResult.myFavourite[i]
                                    if(firstResult.myFavourite.length == 50){
                                        callback(null, array)
                                    }
                                    i++;
                                }
                                while(i < 50)        
                            }
                            else {
                                callback(null, firstResult.myFavourite)
                            }
                        }
                        else{
                            callback(null, firstResult.myFavourite)
                        }
                    }
                })

            }],(err, finalResult)=>{
                let show = finalResult.map((x)=>{
                    return x.product
                })
                let result = {
                    myFavourite:show,
                    page:n,
                    total:show.length,
                    limit:m,
                    pages:Math.ceil(show.length/m)
                }
                return commonFile.responseHandler(res, 200, "Success.",result)
            })

        },



        // @@@@@@@@@@@@@@@@@@@@@@@  productList Api to show the product List with Searching and Filtering and sortBy  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    productList:(req, res)=>{
        
        if (!req.body.userId) {
            return commonFile.responseHandler(res, 400, "Parameters missing.");
        }

        let pattern = "\\b[a-z0-9']*" + req.body.search + "[a-z0-9'?]*\\b";
        // let pattern = new RegExp('^'+req.body.search,'i')
        re = new RegExp(pattern, 'gi');

        user.findOne({_id:req.body.userId}, (err, userResult)=>{
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else{
                
                let query = { bodyType:userResult.bodyType }

                if(req.body.search && req.body.productName){
            
                    query.$and = [{productName:{ $in:req.body.productName }},{productName:re}]
                    console.log("and========>>>",query) 
                }
                else{
                    if(req.body.productName){
                        query.productName = { $in:req.body.productName }
                        console.log("or========>>>",query)
                    }
            
                    if(req.body.search){
                        query.productName = re
                        console.log("or========>>>",query)
                    }
                }
        
                let options = {
                    page:req.body.page || 1,
                    limit:req.body.limit || 10
                }
        
                if(req.body.sortBy){
                    options.sort = { productPrice:req.body.sortBy }
                }
                product.paginate(query, options, (err, result)=>{
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error.")
                    else
                        return commonFile.responseHandler(res, 200, "Success.", result)
                })
            }
        })
    },



        logout:(req, res)=>{
            
            if (!req.params.userId) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }

            user.findByIdAndUpdate({ _id:req.body.userId }, {deviceToken:""}, {new:true}, (err, result)=>{
                if(err)
                    return commonFile.responseHandler(res, 200, "Interbal Server Error.",err)
                else
                    return commonFile.responseHandler(res, 200, "Successfully logout.")
            })

        },




























        

        //*********                  add social account  api for users, Users can add three type of social account             ***********/
        addSocialAccounts: (req, res) => {
            let updateObj = {};

            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameter missing.")
            }
            if (!req.body.kikID && !req.body.scID && !req.body.inID) {
                return commonFile.responseHandler(res, 400, "Internal server error.")
            }
            // add kik account
            if (req.body.kikID)
                updateObj.kikID = req.body.kikID;
            // add snapChat account
            if (req.body.scID)
                updateObj.scID = req.body.scID;
            // add linkedIn account
            if (req.body.inID)
                updateObj.inID = req.body.inID;
            updateObj.status = "ACTIVE"

            user.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(req.body._id)
            }, {
                    $set: updateObj
                }, {
                    new: true
                }, (err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.")

                    return commonFile.responseHandler(res, 200, "You have been add social accounts successfully.")
                })
        },


        // ********                  profile setup API for user,after this api user set his name           **********
        profileSetup: (req, res) => {
            if (!req.body._id && !req.body.userName) {
                return commonFile.responseHandler(res, 400, "Parameter missing.")
            }

            let updateObj = {}
            if (req.body.userName) {
                updateObj.userName = req.body.userName
            }
            if (req.body.age) {
                updateObj.age = req.body.age
            }
            if (req.body.gender) {
                updateObj.gender = req.body.gender
            }
            if (req.body.interestedIn === "male") {
                updateObj.userPreferences = "male"
            } else if (req.body.interestedIn === "female") {
                updateObj.userPreferences = "female"
            } else if (req.body.interestedIn === "none") {
                updateObj.userPreferences = "none"
            } else {
                updateObj.userPreferences = "both"
            }
            user.findOneAndUpdate({
                _id: req.body._id
            }, {
                    $set: updateObj
                }, {
                    new: true
                }, (err, result) => {

                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    else if (result) {
                        return commonFile.responseHandler(res, 200, "You have been setup your profile successfully.", {
                            status: result.status
                        })
                    } else {
                        return commonFile.responseHandler(res, 400, "No user exists.")
                    }

                })
        },

        //********* upload image api this api calls from complete profile setup *************************************************************************************/

        uploadImage: (req, res) => {
            var uRLsArr = [];
            var form = new multiparty.Form();
            form.parse(req, function (err, fields, files) {
                console.log("fields===>", fields)
                console.log("files===>", files)
                async.eachSeries(files['photo'], (item, callbackNextIteratn) => {
                    console.log("item of async each series", item)
                    if (item && item.path) {
                        cloudinary.v2.uploader.upload(item.path, (err, result) => {
                            if (err)
                                return commonFile.responseHandler(res, 400, "Internal server error.")
                            console.log("errorr", err)
                            console.log("Result Done", result);
                            uRLsArr.push(result.url);
                            return commonFile.responseHandler(res, 200, "Image upload successfully.", uRLsArr[0])
                            callbackNextIteratn()
                        })
                    } else {
                        uRLsArr = [];
                        callbackNextIteratn()
                    }
                }, (err) => {
                    console.log(uRLsArr);
                    console.log("Done with async loop")
                })
            });
        },

        // *** this api hit when user want to see his details ****/

        fetchUserDetails: (req, res) => {
            if (!req.query._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing.")
            }
            user.findOne({
                _id: mongoose.Types.ObjectId(req.query._id)
            }, {
                    status: 1,
                    userName: 1,
                    referralCode: 1,
                    boost: 1,
                    coins: 1,
                    kikID: 1,
                    scID: 1,
                    inID: 1,
                    myLikes: 1,
                    viewedMe: 1,
                    likedMe: 1,
                    tags: 1,
                    gender: 1,
                    age: 1,
                    bio: 1,
                    location: 1,
                    privacy: 1,
                    userPreferences: 1,
                    photos: 1,
                    address: 1,
                    loginBy: 1,
                    afterViewedMeLength: 1,
                    afterLikedMeLength: 1,
                    afterMyLikesLength: 1
                }).populate({
                    path: "inviteFr",
                    select: "sms fb mail"
                }).exec((err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.", err)

                    result.ageRange = ["18-22", "22-30", "18-30", "18-50", "18-60"];
                    return commonFile.responseHandler(res, 200, "Success", result)
                })
        },
        //*******************************  update user profile api **********************************/
        updateUserProfile: (req, res) => {
            user.findByIdAndUpdate({
                _id: req.body._id
            }, req.body, {
                    new: true
                }, (err, result) => {
                    if (err) {

                        return commonFile.responseHandler(res, 400, "Internal server error.", err)
                    } else {

                        return commonFile.responseHandler(res, 200, "Your profile have been updated successfully.", result)
                    }
                })
        },


        //************************* logout User api **************************/
        logOut: (req, res) => {
            var date = new Date();
            var timestamp = date.getTime();
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing.")
            }
            user.findOneAndUpdate({
                _id: req.body._id
            }, {
                    $set: {
                        inactiveTime: timestamp
                    }
                }, {
                    new: true
                }, (err, result) => {
                    if (err) {
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    } else {
                        return commonFile.responseHandler(res, 200, "You have been logout successfully.")
                    }
                })
        },
        //************************** deactive User api ******************************/
        deactivateUser: (req, res) => {
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing.")
            }
            user.findOneAndUpdate({
                _id: req.body._id,
                status: "ACTIVE"
            }, {
                    $set: {
                        status: "DEACTIVATED",
                        deactivatedBy: "user"
                    }
                }, {
                    new: true
                }, (err, result) => {
                    if (err) {
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    } else {
                        return commonFile.responseHandler(res, 200, "You have been successfully deactivated.")
                    }
                })
        },

        //******************** when user login with facebook if user is not coonect with facebook then new user is created
        loginWithFacebook: (req, res) => {
            var jwtToken = jwt.sign({
                facebookId: req.body.facebookId,
                // deviceType: req.body.deviceType,
                // deviceToken: req.body.deviceToken
            }, config.jwtSecretKey);

            if (!req.body.facebookId) {
                return commonFile.responseHandler(res, 400, "Parameter missing.");
            }
            //facebook Id mandatory if user login with facebook 
            let updateObj = {
                'facebook.facebookId': req.body.facebookId,
                loginBy: "facebook"
            }
            /*
            there are some specifc fields when some extra information enter by users 
            */
            if (req.body.facebookToken) {
                updateObj['facebook.facebookToken'] = req.body.facebookToken
            }
            if (req.body.facebookName) {
                updateObj['facebook.facebookName'] = req.body.facebookName
                updateObj['userName'] = req.body.facebookName

            }
            if (req.body.deviceToken) {
                updateObj['deviceToken'] = req.body.deviceToken
            }
            if (req.body.deviceType) {
                updateObj['deviceType'] = req.body.deviceType
            }
            if (req.body.facebookPic) {
                updateObj['profilePic'] = req.body.facebookPic
                updateObj['photos.0'] = req.body.facebookPic
            }
            if (req.body.facebookAge) {
                updateObj['age'] = req.body.facebookAge
            }
            if (req.body.facebookGender) {
                updateObj['gender'] = req.body.facebookGender
            }
            if (req.body.facebookNumber) {
                updateObj['facebook.facebookNumber'] = req.body.facebookNumber
            }
            user.findOne({
                'facebook.facebookId': req.body.facebookId
            }, (err, result) => {

                if (err) {

                    return commonFile.responseHandler(res, 400, "Internal server error.")
                } else if (result) {
                    // some status for response for matching conditions
                    if (result.status === "DELETED") {
                        return commonFile.responseHandler(res, 200, "User has deleted his account.")
                    }
                    if (result.status === "BLOCKED") {
                        return commonFile.responseHandler(res, 200, "User has been blocked by admin.")
                    }
                    if (result.status === "BLOCKEDANDDELETED") {
                        return commonFile.responseHandler(res, 200, "User has been blocked and deleted by admin.")
                    }
                    if (result.status === "DEACTIVATED") {
                        return commonFile.responseHandler(res, 200, "User has been Deactivated by admin.")
                    }
                    if (result.status === "ACTIVE") {

                        user.findOneAndUpdate({
                            'facebook.facebookId': req.body.facebookId
                        }, updateObj, {
                                new: true
                            }).lean().exec((err, resultActive) => {
                                if (err) {
                                    return commonFile.responseHandler(res, 400, "Internal server error.")
                                } else if (!resultActive) {
                                    return commonFile.responseHandler(res, 200, "User not found.");
                                } else {
                                    resultActive.jwtToken = jwtToken
                                    return commonFile.responseHandler(res, 200, "Successfully login.", resultActive);
                                }
                            })
                    }
                } else {
                    // save the information of user 
                    updateObj.status = "ACTIVE"

                    var newUser = new user(updateObj)

                    newUser.save((err, signupResult) => {

                        if (err) {
                            return commonFile.responseHandler(res, 400, "Internal server error.", err)
                        } else {
                            return commonFile.responseHandler(res, 200, "Signup Successfully.", signupResult);
                        }
                    })
                }
            })
        },

        //**********       user take free boost only One time after key is update freeBoost         ******/
        freeBoost: (req, res) => {
            let is_Free = false;
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameter missing.");
            }
            user.findOne({
                _id: req.body._id
            }, (err, result) => {
                if (err) {
                    return commonFile.responseHandler(res, 400, "Internal server error.");
                } else if (!result) {
                    return commonFile.responseHandler(res, 200, "User not found.");
                } else if (result.freeBoost == true) {
                    return commonFile.responseHandler(res, 200, "You have already taken free boost.");
                } else {
                    var query = {
                        _id: req.body._id
                    }
                    var options = {
                        $inc: {
                            boost: 50
                        },
                        $set: {
                            freeBoost: true
                        }
                    }
                }
                user.findOneAndUpdate(query, options, {
                    new: true
                }, (err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.");
                    else
                        return commonFile.responseHandler(res, 200, "You have taken free boost successfully.", result.boost);
                })
            })

        },

        // user take subscription for free for 3 days, after three days user take subscripton if user want to enjoy this app 

        addSubscription: (req, res) => {
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing.")
            }
            let d = new Date(); //get time in ms
            let n = d.getTime() + 3 * 86400000; // add subscription for 3 day's
            //    update subscriptionPeriod for 3 days
            let update = {
                subscriptionPeriod: n,
                isUnlockedAll: true
            }

            user.findOneAndUpdate({
                _id: req.body._id
            }, update, {
                    new: true
                }, (err, subscriptionResult) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    else if (!subscriptionResult)
                        return commonFile.responseHandler(res, 200, "User not found.")
                    else
                        return commonFile.responseHandler(res, 200, "Successfully added free subscription for 3 day's.")
                })

        },

        //********************************** upgrade subsciption/premium api ****************************************/
        upgradeSubscription: (req, res) => {
            if (!req.body._id || !req.body.transactionId || !req.body.days || !req.body.amount || !req.body.packageName) {
                return commonFile.responseHandler(res, 400, "Parameters missing.")
            }
            // let d = new Date();
            let n = req.body.days * 86400000; // add subscription for specific day's
            let update = {
                $inc: {
                    subscriptionPeriod: n
                },
                isUnlockedAll: true,

            }
            user.findOneAndUpdate({
                _id: req.body._id,
                status: "ACTIVE"
            }, update, {
                    new: true
                }, (err, result) => {
                    if (err) {
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    } else if (!result) {
                        return commonFile.responseHandler(res, 409, "User not found.")
                    } else {
                        new packageTransactions({
                            transactionId: req.body.transactionId,
                            amount: Number(req.body.amount),
                            packageName: req.body.packageName,
                            purchaseBy: mongoose.Types.ObjectId(req.body._id)
                        }).save((err, result_) => {
                            if (err)
                                return commonFile.responseHandler(res, 400, "Internal server error.");
                            console.log(result_)
                            return commonFile.responseHandler(res, 200, "Successfully added subscription for " + req.body.days + " day's.")

                        })

                    }

                })

        },



        // ************                       get User api, a login users can show all active users                            ***********/
        getUsers: (req, res) => {

            let n = req.body.pageNumber || 1,
                m = req.body.pageLimit || 35;
            let query = {
                status: {
                    $eq: "ACTIVE"
                }
            };
            /*there are three types of filters
            1-->  looking for, user is interest in which gender 
            2-->  age range
            3-->  social account
            */
            var gender = "";
            // looking filter for male/female result
            if (req.body.lookingFor) {
                if (req.body.lookingFor === "Male") {
                    gender = "boy"
                    query.gender = gender;
                }
                if (req.body.lookingFor === "Female") {
                    gender = "girl"
                    query.gender = gender;
                }
                if (req.body.lookingFor === "Everyone" || req.body.lookingFor === "None") {

                }

            }
            // ageRange filter for result
            if (req.body.ageRange) {
                min = parseInt(req.body.ageRange.split("-")[0]);
                max = parseInt(req.body.ageRange.split("-")[1]);
            } else {
                min = 0;
                max = 60;
            }

            query.age = {
                $gte: min,
                $lte: max
            }

            // social account filter for users
            if (req.body.socialAccount) {
                if (req.body.socialAccount[0] === "All") { } else {
                    var scIndex = req.body.socialAccount.findIndex((x) => x == 'Snapchat');
                    var kikIndex = req.body.socialAccount.findIndex((x) => x == 'Kik');
                    var inIndex = req.body.socialAccount.findIndex((x) => x == 'Instagram');
                    if (scIndex != -1) {
                        query.scID = {
                            $ne: ""
                        }
                    }
                    if (kikIndex != -1) {
                        query.kikID = {
                            $ne: ""
                        }
                    }
                    if (inIndex != -1) {
                        query.inID = {
                            $ne: ""
                        }
                    }

                }
            }


            user.findOne({
                _id: req.body._id
            }, (err, oneIdResult) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.", err)
                else if (!oneIdResult)
                    return commonFile.responseHandler(res, 200, "User not found.")
                else {

                    let updateObj = {
                        isUnlockedAll: false
                    }
                    // show a key at frontEnd that is decided user has take subsciption or not 
                    if (oneIdResult.subscriptionPeriod) {

                        if (Date.now() - oneIdResult.subscriptionPeriod >= 0) {

                            updateObj.isUnlockedAll = false
                        } else {
                            updateObj.isUnlockedAll = true
                        }
                    }

                    user.findOneAndUpdate({
                        _id: req.body._id
                    }, updateObj, {
                            new: true
                        }, (err, oneId) => {

                            if (err) {
                                return commonFile.responseHandler(res, 400, "Internal server error.", err)
                            } else if (!oneId) {
                                return commonFile.responseHandler(res, 200, "User not found.")
                            } else {
                                /*blcok , reportUser ,reportedByUser 
                                are not show to a particular users*/
                                // filter from the result number of users those are present in reportUser array
                                var ids = oneId.reportUser.map((x) => x.userId);
                                // filter from the result number of users those are present in blocked array
                                var ids1 = oneId.blocked.map((x) => x.user);
                                // filter from the result number of users those are present in reportedBy array
                                var ids2 = oneId.reportedBy.map((x) => x.userId)

                                query.$and = [{
                                    '_id': {
                                        $nin: ids
                                    }
                                }, {
                                    '_id': {
                                        $nin: ids1
                                    }
                                }, {
                                    '_id': {
                                        $nin: ids2
                                    }
                                }]

                                user.find(query).lean().exec((err, result) => {
                                    if (err)
                                        return commonFile.responseHandler(res, 400, "Internal server error.", err)
                                    else {
                                        let index = -1;
                                        var firstIndexData = result[0]

                                        index = result.findIndex((x) => x._id == req.body._id)

                                        if (index != -1) {
                                            result[0] = oneId
                                            result[index] = firstIndexData
                                        }
                                        // custom pagination for
                                        var userList1 = result.slice((n - 1) * m, n * m)

                                        var userList = []

                                        //checking unlocked users isUnlocked true or false
                                        userList1.map((x) => {

                                            var index = oneId.unlockedUsers.findIndex((y) => x._id == y);

                                            if (index == -1) {
                                                x.isUnlocked = false

                                            } else {
                                                x.isUnLocked = true
                                            }
                                            return;
                                        })
                                        //check my likes array and give a key isLked true or false
                                        userList1.map((x) => {
                                            var index1 = oneId.myLikes.findIndex((y) => x._id.toString() == y.user.toString());

                                            if (index1 == -1) {
                                                x.isLiked = false

                                            } else {
                                                x.isLiked = true

                                            }
                                            return;
                                        })


                                        userList.push({
                                            isSubscribed: updateObj.isUnlockedAll,
                                            userList: userList1,
                                            page: n,
                                            limit: m,
                                            pages: Math.ceil(result.length / m),
                                            total: result.length
                                        })

                                        return commonFile.responseHandler(res, 200, "Success.", userList)
                                    }
                                })

                            }
                        })
                }
            })
        },




        //**          show users in 100 miles distances                              *********/
        nearByUsers: (req, res) => {
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameter missing.");
            }
            if (req.body.long == 0 && req.body.lat == 0) {
                return commonFile.responseHandler(res, 400, "User has not set his location.")
            }
            user.findOne({
                _id: mongoose.Types.ObjectId(req.body._id),
                status: "ACTIVE"
            }, (err, oneId) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.", err);
                else if (!oneId)
                    return commonFile.responseHandler(res, 200, "User not found.");
                else {

                    let updateObj = {
                        isUnlockedAll: false
                    }

                    if (oneId.subscriptionPeriod) {

                        if (Date.now() - oneId.subscriptionPeriod >= 0) {
                            updateObj.isUnlockedAll = false
                        } else {
                            updateObj.isUnlockedAll = true
                        }
                    }
                    user.findOneAndUpdate({
                        _id: mongoose.Types.ObjectId(req.body._id),
                        status: "ACTIVE"
                    }, updateObj, {
                            new: true
                        }, (err, result) => {

                            if (err) {
                                return commonFile.responseHandler(res, 400, "Internal server error.", err);
                            } else {
                                /*blcok , reportUser ,reportedByUser 
                                 are not show to a particular users*/
                                var ids = result.reportUser.map((x) => x.userId);
                                var ids1 = result.blocked.map((x) => x.user);
                                var ids2 = result.reportedBy.map((x) => x.userId)

                                var masterQuery = [{


                                    $geoNear: {
                                        // near: { type: "Point", coordinates: result.location.coordinates },
                                        near: {
                                            type: "Point",
                                            coordinates: [req.body.long, req.body.lat]
                                        },
                                        distanceField: "dist.calculated",
                                        distanceMultiplier: 0.000621371, //  1 meter is equal to  0.000621371 mile
                                        maxDistance: 160934, // maxDistance in mile( 100mile is equal to 160934 m )
                                        query: {
                                            status: "ACTIVE"
                                        }, // it's a query for specific condition
                                        includeLocs: "dist.location",
                                        spherical: true
                                    }


                                }]

                                masterQuery[0].$geoNear.query.$and = [{
                                    '_id': {
                                        $nin: ids
                                    }
                                }, {
                                    '_id': {
                                        $nin: ids1
                                    }
                                }, {
                                    '_id': {
                                        $nin: ids2
                                    }
                                },
                                {
                                    _id: {
                                        $nin: [req.body._id]
                                    },
                                },
                                {
                                    'location.coordinates': {
                                        $nin: [0, 0]
                                    }
                                }
                                ]
                                // console.log("masterQuery=========>", masterQuery)
                                let gender = "";
                                if (req.body.lookingFor) {
                                    if (req.body.lookingFor === "Male") {
                                        gender = "boy"
                                        masterQuery[0].$geoNear.query.gender = gender;
                                    }
                                    if (req.body.lookingFor === "Female") {
                                        gender = "girl"
                                        masterQuery[0].$geoNear.query.gender = gender;
                                    }
                                    if (req.body.lookingFor === "Everyone" || req.body.lookingFor === "None") {

                                    }

                                }

                                if (req.body.ageRange) {
                                    min = parseInt(req.body.ageRange.split("-")[0]);
                                    max = parseInt(req.body.ageRange.split("-")[1]);
                                } else {
                                    min = 18;
                                    max = 60;
                                }

                                masterQuery[0].$geoNear.query.age = {
                                    $gte: min,
                                    $lte: max
                                }


                                if (req.body.socialAccount) {
                                    if (req.body.socialAccount[0] === "All") { } else {
                                        var scIndex = req.body.socialAccount.findIndex((x) => x == 'Snapchat');
                                        var kikIndex = req.body.socialAccount.findIndex((x) => x == 'Kik');
                                        var inIndex = req.body.socialAccount.findIndex((x) => x == 'Instagram');
                                        if (scIndex != -1) {
                                            masterQuery[0].$geoNear.query.scID = {
                                                $ne: ""
                                            }
                                        }
                                        if (kikIndex != -1) {
                                            masterQuery[0].$geoNear.query.kikID = {
                                                $ne: ""
                                            }
                                        }
                                        if (inIndex != -1) {
                                            masterQuery[0].$geoNear.query.inID = {
                                                $ne: ""
                                            }
                                        }

                                    }
                                }

                                var aggregate = user.aggregate(masterQuery);
                                // console.log("aggregate===>>>", aggregate)
                                let options = {
                                    // select: " -email",
                                    lean: true,
                                    page: req.body.pageNumber || 1,
                                    limit: req.body.pageLimit || 10,
                                    // 'dist.calculated':{sort:-1},
                                }

                                user.aggregatePaginate(aggregate, options).then((value) => {

                                    let index = value.data.findIndex((x) => x._id == req.body._id)

                                    if (index != -1) {
                                        value.data.splice(index, 1)
                                        value.totalCount = value.totalCount - 1;
                                    }
                                    value.data.map((x) => {

                                        var index = result.unlockedUsers.findIndex((y) => x._id.toString() == y);

                                        if (index == -1) {
                                            x.isUnlocked = false

                                        } else {
                                            x.isUnlocked = true
                                        }
                                        return;
                                    })
                                    value.data.map((x) => {
                                        var index1 = result.myLikes.findIndex((y) => x._id.toString() == y.user.toString());

                                        if (index1 == -1) {
                                            x.isLiked = false

                                        } else {
                                            x.isLiked = true

                                        }
                                        return;
                                    })

                                    value.isSubscribed = updateObj.isUnlockedAll
                                    return commonFile.responseHandler(res, 200, "Success.", value)
                                }).catch(function (err) {

                                    return commonFile.responseHandler(res, 400, "Internal server error.", err)

                                })
                            }
                        })
                }
            })

        },

        //   getPopular Users on screen popular users is decided with no. of boost and likeme viewed me
        getPopularUsers: (req, res) => {

            let query = {
                status: "ACTIVE"
            };

            var gender = "";
            // looking filter for male/female result
            if (req.body.lookingFor) {
                if (req.body.lookingFor === "Male") {
                    gender = "boy"
                    query.gender = gender;
                }
                if (req.body.lookingFor === "Female") {
                    gender = "girl"
                    query.gender = gender;
                }
                if (req.body.lookingFor === "Everyone" || req.body.lookingFor === "None") {

                }

            }
            // ageRange filter for result
            if (req.body.ageRange) {
                min = parseInt(req.body.ageRange.split("-")[0]);
                max = parseInt(req.body.ageRange.split("-")[1]);
            } else {
                min = 0;
                max = 60;
            }

            query.age = {
                $gte: min,
                $lte: max
            }

            // social account filter for users
            if (req.body.socialAccount) {
                if (req.body.socialAccount[0] === "All") { } else {
                    var scIndex = req.body.socialAccount.findIndex((x) => x == 'Snapchat');
                    var kikIndex = req.body.socialAccount.findIndex((x) => x == 'Kik');
                    var inIndex = req.body.socialAccount.findIndex((x) => x == 'Instagram');
                    if (scIndex != -1) {
                        query.scID = {
                            $ne: ""
                        }
                    }
                    if (kikIndex != -1) {
                        query.kikID = {
                            $ne: ""
                        }
                    }
                    if (inIndex != -1) {
                        query.inID = {
                            $ne: ""
                        }
                    }

                }
            }
            let options = {
                lean: true,
                sort: {
                    boost: -1
                },

                page: req.body.pageNumber || 1,
                limit: req.body.pageLimit || 35
            }

            user.findOne({
                _id: req.body._id
            }, (err, oneId) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.", err)
                else if (!oneId)
                    return commonFile.responseHandler(res, 400, "User not found.")
                else {

                    let updateObj = {
                        isUnlockedAll: false
                    }
                    // show a key at frontEnd that is decided user has take subsciption or not 
                    if (oneId.subscriptionPeriod) {

                        if (Date.now() - oneId.subscriptionPeriod >= 0) {
                            updateObj.isUnlockedAll = false
                        } else {
                            updateObj.isUnlockedAll = true
                        }
                    }



                    user.findOneAndUpdate({
                        _id: req.body._id
                    }, updateObj, {
                            new: true
                        }, (err, result1) => {
                            if (err) {
                                return commonFile.responseHandler(res, 400, "Internal server error.", err)
                            } else {
                                // filter from the result number of users those are present in reportUser array
                                var ids = result1.reportUser.map((x) => x.userId);
                                // filter from the result number of users those are present in blocked array
                                var ids1 = result1.blocked.map((x) => x.user);
                                // filter from the result number of users those are present in reportedBy array
                                var ids2 = result1.reportedBy.map((x) => x.userId);
                                query.$and = [{
                                    '_id': {
                                        $nin: ids
                                    }
                                }, {
                                    '_id': {
                                        $nin: ids1
                                    }
                                }, {
                                    '_id': {
                                        $nin: ids2
                                    }
                                },
                                {
                                    _id: {
                                        $nin: [req.body._id]
                                    },
                                }
                                ]


                                user.paginate(query, options, (err, result) => {
                                    if (err) {

                                        return commonFile.responseHandler(res, 400, "Internal server error.", err)

                                    } else if (result.length < 1) {

                                        return commonFile.responseHandler(res, 400, "User not found.")

                                    } else {
                                        // add keys is result that check which user is unlocked to a particular users
                                        result.docs.map((x) => {

                                            var index = result1.unlockedUsers.findIndex((y) => x._id.toString() == y);
                                            if (index == -1) {

                                                x.isUnlocked = false

                                            } else {

                                                x.isUnlocked = true
                                            }
                                            return;
                                        })
                                        //check my likes array and give a key isLked true or false
                                        // add keys is result that check which user is liked by user
                                        result.docs.map((x) => {
                                            var index1 = result1.myLikes.findIndex((y) => x._id.toString() == y.user.toString());
                                            if (index1 == -1) {
                                                x.isLiked = false
                                            } else {
                                                x.isLiked = true
                                            }
                                            return;
                                        })

                                        // decided which is user is most popular from result
                                        //popular user is decided by (boost+likeme+viewedme)
                                        result.docs.map((x) => x.add = x.boost + x.likedMe.length + x.viewedMe.length);
                                        result.docs.sort((a, b) => {
                                            return b.add - a.add
                                        });
                                        result.isSubscribed = updateObj.isUnlockedAll
                                        return commonFile.responseHandler(res, 200, "Successfull", result)
                                    }

                                })


                            }
                        })

                }
            })

        },

        //*******    show a list of users on frontEnd and search with a specific Tag               ************/
        searchByTags: (req, res) => {
            if (!req.body.searchTag) {
                return commonFile.responseHandler(res, "Parameter missing.")
            }
            query = {
                _id: {
                    $ne: req.body._id
                },
                status: {
                    $eq: "ACTIVE"
                }
            };
            // for get all except login user with filter
            if (req.body.searchTag) {
                //search pattern for a search text
                let pattern = "\\b[a-z0-9']*" + req.body.searchTag + "[a-z0-9'?]*\\b";
                re = new RegExp(pattern, 'gi');
                query.tags = re
            }
            var gender = "";
            // looking filter for male/female result
            if (req.body.lookingFor) {
                if (req.body.lookingFor === "Male") {
                    gender = "boy"
                    query.gender = gender;
                }
                if (req.body.lookingFor === "Female") {
                    gender = "girl"
                    query.gender = gender;
                }
                if (req.body.lookingFor === "Everyone" || req.body.lookingFor === "None") { }
            }
            // ageRange filter for result
            if (req.body.ageRange) {

                min = parseInt(req.body.ageRange.split("-")[0]);
                max = parseInt(req.body.ageRange.split("-")[1]);
            } else {
                min = 0;
                max = 60;
            }

            query.age = {
                $gte: min,
                $lte: max
            }

            // social account filter for users
            if (req.body.socialAccount) {
                if (req.body.socialAccount[0] === "All") { } else {
                    var scIndex = req.body.socialAccount.findIndex((x) => x == 'Snapchat');
                    var kikIndex = req.body.socialAccount.findIndex((x) => x == 'Kik');
                    var inIndex = req.body.socialAccount.findIndex((x) => x == 'Instagram');
                    if (scIndex != -1) {
                        query.scID = {
                            $ne: ""
                        }
                    }
                    if (kikIndex != -1) {
                        query.kikID = {
                            $ne: ""
                        }
                    }
                    if (inIndex != -1) {
                        query.inID = {
                            $ne: ""
                        }
                    }

                }
            }

            user.findOne({
                _id: mongoose.Types.ObjectId(req.body._id),
                status: "ACTIVE"
            }, (err, oneId) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.", err);
                else if (!oneId)
                    return commonFile.responseHandler(res, 409, "User not found.");
                else {

                    let updateObj = {
                        isUnlockedAll: false
                    }
                    // show a key at frontEnd that is decided user has take subsciption or not 
                    if (oneId.subscriptionPeriod) {

                        if (Date.now() - oneId.subscriptionPeriod >= 0) {
                            updateObj.isUnlockedAll = false
                        } else {
                            updateObj.isUnlockedAll = true
                        }
                    }

                    user.findOneAndUpdate({
                        _id: mongoose.Types.ObjectId(req.body._id),
                        status: "ACTIVE"
                    }, updateObj, {
                            new: true
                        }, (_err, _result) => {
                            if (_err) {
                                return commonFile.responseHandler(res, 400, "Internal server error.", _err)
                            } else if (!_result) {
                                return commonFile.responseHandler(res, 200, "User not found.")
                            } else {
                                // filter from the result number of users those are present in reportUser array
                                var ids = _result.reportUser.map((x) => x.userId);
                                // filter from the result number of users those are present in blocked array
                                var ids1 = _result.blocked.map((x) => x.user);
                                // filter from the result number of users those are present in reportedBy array
                                var ids2 = _result.reportedBy.map((x) => x.userId);
                                query.$and = [{
                                    '_id': {
                                        $nin: ids
                                    }
                                }, {
                                    '_id': {
                                        $nin: ids1
                                    }
                                }, {
                                    '_id': {
                                        $nin: ids2
                                    }
                                }]

                                user.find(query).lean().exec((err, result) => {

                                    if (err) {
                                        return commonFile.responseHandler(res, 400, "Internal server error.", err)
                                    } else if (result.length < 1) {
                                        return commonFile.responseHandler(res, 200, "User not found.")
                                    } else {
                                        // add keys is result that check which user is unlocked to a particular users
                                        result.map((x) => {

                                            var index = _result.unlockedUsers.findIndex((y) => x._id == y);

                                            if (index == -1) {
                                                x.isUnlocked = false

                                            } else {
                                                x.isUnLocked = true
                                            }
                                            return;
                                        })
                                        //check my likes array and give a key isLked true or false
                                        // add keys is result that check which user is liked by user
                                        result.map((x) => {
                                            var index1 = _result.myLikes.findIndex((y) => x._id.toString() == y.user.toString());

                                            if (index1 == -1) {
                                                x.isLiked = false

                                            } else {
                                                x.isLiked = true

                                            }
                                            return;
                                        })
                                        let m = req.body.pageLimit || 35;
                                        let n = req.body.pageNumber || 1;
                                        // decided which is user is most popular from result
                                        //popular user is decided by (boost+likeme+viewedme)
                                        result.map((x) => x.add = x.boost + x.likedMe.length + x.viewedMe.length);
                                        result.sort((a, b) => {
                                            return b.add - a.add
                                        });

                                        let popularUserList1 = result.filter((x) => x.add >= result[0].add); // how many user popular
                                        let showPopularData = popularUserList1.slice((n - 1) * m, n * m) //custom pagination for result

                                        let popularUserList = {
                                            popularUserList: showPopularData,
                                            page: n,
                                            limit: m,
                                            total: popularUserList1.length,
                                            pages: Math.ceil(popularUserList1.length / m)
                                        }

                                        let restUserList1 = result.filter((x) => x.add < result[0].add) // rest all the user rest user
                                        let showRestData = restUserList1.slice((n - 1) * m, n * m)

                                        let restUserList = {
                                            restUserList: showRestData,
                                            page: n,
                                            limit: m,
                                            total: restUserList1.length,
                                            pages: Math.ceil(restUserList1.length / m)
                                        }

                                        let finalResponse = {
                                            isSubscribed: updateObj.isUnlockedAll,
                                            popular: popularUserList,
                                            rest: restUserList
                                        }
                                        return commonFile.responseHandler(res, 200, "This is your list with this tag", finalResponse)
                                    }
                                })
                            }
                        })
                }
            })
        },




        //**************************                   show a list of user with corresponding tag      ********************/

        tagApi: (req, res) => {
            let n = req.body.pageNumber || 1,
                m = req.body.pageLimit || 35;
            if (!req.body.tagName || !req.body._id) {
                return commonFile.responseHandler(res, "Parameter missing.")
            }
            user.findOne({
                _id: req.body._id
            }, (err, result) => {

                if (err) {
                    return commonFile.responseHandler(res, 400, "Internal server error.", err)
                } else if (!result) {
                    return commonFile.responseHandler(res, 200, "User not found.")
                } else {
                    // filter from the result number of users those are present in reportUser  array
                    var ids = result.reportUser.map((x) => x.userId);
                    // filter from the result number of users those are present in blocked array
                    var ids1 = result.blocked.map((x) => x.user);
                    // filter from the result number of users those are present in reportedBy array
                    var ids2 = result.reportedBy.map((x) => x.userId);

                    var userIds = [...ids, ...ids1, ...ids2];
                    let query = {
                        tags: req.body.tagName
                        // status:"ACTIVE"
                    }

                    user.find({
                        $and: [{
                            tags: req.body.tagName
                        }, {
                            _id: {
                                $nin: userIds
                            }
                        }, {
                            status: "ACTIVE"
                        }]
                    }, ).exec((err, result) => {
                        if (err) {

                            return commonFile.responseHandler(res, 400, "Internal server error.", err)
                        } else if (result.length <= 0) {
                            return commonFile.responseHandler(res, 200, "Tag not found.")
                        } else {
                            let showData = result.slice((n - 1) * m, n * m); //custom pagination
                            let finalResult = {
                                'result': result,
                                'page': n,
                                'total': result.length,
                                'pages': Math.ceil(result.length / m),
                                'limit': m
                            }
                            return commonFile.responseHandler(res, 200, "This is user list with corresponding tag.", finalResult)
                        }

                    })
                }
            })

        },

        //***********       show a list of hot tags on screen ,hot tag is a tag that is uses maxmium number of users      ****/
        hotTagList: (req, res) => {
            let query = {}
            var gender = "";
            // filter for gender
            if (req.body.lookingFor) {
                if (req.body.lookingFor === "Male") {
                    gender = "boy"
                    query.gender = gender;
                }
                if (req.body.lookingFor === "Female") {
                    gender = "girl"
                    query.gender = gender;
                }
                if (req.body.lookingFor === "Everyone" || req.body.lookingFor === "None") { }
            }
            // filter for age
            if (req.body.ageRange) {
                min = parseInt(req.body.ageRange.split("-")[0]);
                max = parseInt(req.body.ageRange.split("-")[1]);
            } else {
                min = 0;
                max = 60;
            }
            //if user dont't give any age then default value set for filter
            query.age = {
                $gte: min,
                $lte: max
            }
            /* filter for socialAccount ,there are three type of filter in social account
            1-->firstOne is snapChat
            2-->secondone is kik
            3-->  thirdOne is Instagram
            */
            if (req.body.socialAccount) {
                if (req.body.socialAccount[0] === "All") { } else {
                    var scIndex = req.body.socialAccount.findIndex((x) => x == 'Snapchat');
                    var kikIndex = req.body.socialAccount.findIndex((x) => x == 'Kik');
                    var inIndex = req.body.socialAccount.findIndex((x) => x == 'Instagram');
                    if (scIndex != -1) {
                        query.scID = {
                            $ne: ""
                        }
                    }
                    if (kikIndex != -1) {
                        query.kikID = {
                            $ne: ""
                        }
                    }
                    if (inIndex != -1) {
                        query.inID = {
                            $ne: ""
                        }
                    }

                }
            }

            user.findOne({
                _id: mongoose.Types.ObjectId(req.body._id),
                status: "ACTIVE"
            }, (err, oneId) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.", err);
                else if (!oneId)
                    return commonFile.responseHandler(res, 409, "User not found.");
                else {

                    let updateObj = {
                        isUnlockedAll: false
                    }

                    if (oneId.subscriptionPeriod) {
                        // show a key at frontEnd that is decided user has take subsciption or not 
                        if (Date.now() - oneId.subscriptionPeriod >= 0) {
                            updateObj.isUnlockedAll = false
                        } else {
                            updateObj.isUnlockedAll = true
                        }
                    }

                    user.findOneAndUpdate({
                        _id: mongoose.Types.ObjectId(req.body._id),
                        status: "ACTIVE"
                    }, updateObj, {
                            new: true
                        }, (err, updateResult) => {
                            if (err)
                                return commonFile.responseHandler(res, 400, "Internal server error.")
                            else if (!updateResult)
                                return commonFile.responseHandler(res, 409, "User not found.")
                            else {

                                user.find({
                                    _id: mongoose.Types.ObjectId(req.body._id),
                                    status: "ACTIVE"
                                }, (err, _result) => {

                                    if (err) {
                                        return commonFile.responseHandler(res, 400, "Internal server error.")
                                    } else {
                                        var ids, ids1 = [];
                                        /*there are three condition if  any user 
                                        block,report,reportBY of a particular users
                                        so that is not present in hot Tags screen*/
                                        if (_result.length > 0) {
                                            var ids = _result[0].reportUser.map((x) => x.userId);
                                        }
                                        if (_result.length > 0) {
                                            var ids1 = _result[0].blocked.map((x) => x.user);
                                        }
                                        if (_result.length > 0) {
                                            var ids2 = _result[0].reportedBy.map((x) => x.userId);
                                        }
                                        query.$and = [{
                                            '_id': {
                                                $nin: ids
                                            }
                                        }, {
                                            '_id': {
                                                $nin: ids1
                                            }
                                        }, {
                                            '_id': {
                                                $nin: ids2
                                            }
                                        }]
                                        user.find({}, (err, newResult) => {

                                            if (err) {

                                                return commonFile.responseHandler(res, 400, "Internal server error.")
                                            } else if (!newResult) {
                                                return commonFile.responseHandler(res, 200, "No user found.")
                                            } else {
                                                let masterQuery = [

                                                    {
                                                        $unwind: "$tags"
                                                    },

                                                    {
                                                        $match: {
                                                            $and: [query]
                                                        }
                                                    },
                                                    {
                                                        $group: {
                                                            _id: "$tags",
                                                            tags: {
                                                                $sum: 1
                                                            }
                                                        }
                                                    },
                                                    {
                                                        $sort: {
                                                            tags: -1
                                                        }
                                                    }
                                                ]
                                                let options = {
                                                    page: req.body.pageNumber || 1,
                                                    limit: req.body.pageLimit || 35
                                                }
                                                var aggregate = user.aggregate(masterQuery)
                                                user.aggregatePaginate(aggregate, options).then((result) => {
                                                    var tagArr = result.data.map((x) => x._id);
                                                    let response = []
                                                    var i = 0;
                                                    loop(i);

                                                    function loop(i) {
                                                        if (i == tagArr.length) {
                                                            var finalResponse = {
                                                                'isSubscribed': updateObj.isUnlockedAll,
                                                                'list': response,
                                                                'total': result.totalCount,
                                                                'limit': 35,
                                                                'page': result.pageCount, // pageCount key is by default in aggregatePaginate
                                                                // totalCount key is by default in aggregatePaginate
                                                            }
                                                            return commonFile.responseHandler(res, 200, "Success", finalResponse)
                                                        } else {
                                                            query.tags = tagArr[i];
                                                            user.find(query).lean().exec((err, result1) => {
                                                                result1.map((x) => {
                                                                    var index = _result[0].unlockedUsers.findIndex((y) => x._id == y);
                                                                    if (index == -1) {
                                                                        x.isUnlocked = false
                                                                    } else {
                                                                        x.isUnLocked = true
                                                                    }
                                                                    return;
                                                                })
                                                                result1.map((x) => {
                                                                    var index = _result[0].myLikes.findIndex((y) => x._id == y.user.toString());
                                                                    if (index == -1) {
                                                                        x.isLiked = false
                                                                    } else {
                                                                        x.isLiked = true
                                                                    }
                                                                    return;
                                                                })
                                                                response.push({
                                                                    tag: tagArr[i],
                                                                    userList: result1
                                                                });
                                                                i = i + 1;
                                                                loop(i)
                                                            })
                                                        }
                                                    }

                                                });
                                            }
                                        })

                                    }
                                })

                            }

                        })


                }

            })

        },

        //*********** this api check user take daily rewards or not    *******************************************/

        checkDailyRewards: (req, res) => {
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }
            user.findById({
                _id: req.body._id
            }, {
                    isDailyRewards: 1
                }, (err, result) => {
                    if (err) {
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    } else if (!result) {
                        return commonFile.responseHandler(res, 200, "User not found.")
                    } else {
                        return commonFile.responseHandler(res, 200, "Success.", result);
                    }
                })
        },



        //*********** this api  take daily rewards    *******************************************/
        takeDailyRewards: (req, res) => {
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }
            user.findById({
                _id: req.body._id
            }, (err, result) => {
                if (err) {
                    return commonFile.responseHandler(res, 400, "Internal server error.")
                } else if (!result) {
                    return commonFile.responseHandler(res, 200, "User not found.")
                } else {
                    var rewardsObj = {};
                    let coins = 5;
                    let views = 5;
                    let date = Date.now(); //get current time
                    let date1 = result.updatedAt.getTime(); //get updated date from db
                    //   check user is take daily rewards 
                    if (result.isDailyRewards === false) {
                        // increase daily rewards value and coins value & set a true value for dailyRewards 
                        let options = {
                            $inc: {
                                "dailyRewards": coins,
                                "coins": coins
                            },
                            $set: {
                                isDailyRewards: true,

                            },
                            // update date when user take daily reward to updatedAt field
                            updatedAt: Date.now()
                        }
                        user.findOneAndUpdate({
                            _id: req.body._id
                        }, options, {
                                new: true
                            }, (err1, result1) => {
                                // var rewardsObj = {};
                                console.log('======.Result1', result1)
                                rewardsObj.isDailyRewards = true
                                rewardsObj.todayRewardcoins = coins;
                                rewardsObj.totalRewardcoins = result1.dailyRewards
                                rewardsObj.views = views;
                                console.log('======.rewardsObj', rewardsObj)

                                // date2 = result.updatedAt;
                                if (err1) {
                                    return commonFile.responseHandler(res, 400, "Internal server error.")
                                } else {
                                    return commonFile.responseHandler(res, 200, "You have been get reward successfully.", rewardsObj);
                                }
                            })
                    } else {
                        rewardsObj.isDailyRewards = true
                        rewardsObj.todayRewardcoins = coins;
                        rewardsObj.views = views;
                        rewardsObj.totalRewardcoins = coins
                        // come in this block if user is already take rewards
                        return commonFile.responseHandler(res, 200, "You have been already get rewards for today.", rewardsObj);

                    }
                }
            })
        },




        //****** There is button at front end with that button you can lik and unlike to a other user          **************/
        likeUnlikeUser: (req, res) => {
            let updatelikedMe = {};
            let updatemyLikes = {};
            if (!req.body.like || !req.body.likedBy || !req.body.requestType) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }
            // if request type is like then .....
            if (req.body.requestType === "like") {
                //push a user in likedMe array & inc 1 value of like on screen
                updatelikedMe = {
                    $push: {
                        likedMe: {
                            user: req.body.likedBy
                        }
                    },
                    $inc: {
                        afterLikedMeLength: 1
                    }
                }
                //push a user int myLikes array & inc 1 value of myLikes on screen
                updatemyLikes = {
                    $push: {
                        myLikes: {
                            user: req.body.like
                        }
                    },
                    $inc: {
                        afterMyLikesLength: 1
                    }
                }

            }
            // if request type is unlike then execute this function
            else if (req.body.requestType === "unlike") {
                //   remove a user from likedMe array
                updatelikedMe = {
                    $pull: {
                        likedMe: {
                            user: req.body.likedBy
                        }
                    },
                }
                // remove a user from myLikes array in decrese a value of myLikes at front end
                updatemyLikes = {
                    $pull: {
                        myLikes: {
                            user: req.body.like
                        }
                    },
                    $inc: {
                        afterMyLikesLength: -1
                    }
                }

            } else {
                return commonFile.responseHandler(res, 400, "Invalid request type.");
            }

            async.waterfall([(callback) => {
                user.findOne({
                    _id: req.body.likedBy
                }, (err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.");
                    else
                        callback(null, result)
                })

            }, (data, callback) => {

                if (data.afterMyLikesLength == 0 && req.body.requestType === "unlike") {
                    updatemyLikes.$inc.afterMyLikesLength = 0
                }

                user.findByIdAndUpdate({
                    _id: mongoose.Types.ObjectId(req.body.like)
                }, updatelikedMe, (err, afterLikedMeResult) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    else if (afterLikedMeResult) {

                        // if request type is unlike the decrease value by -1 at front screen 
                        if (req.body.requestType === "unlike") {
                            let update = {
                                $set: {
                                    afterLikedMeLength: afterLikedMeResult.afterLikedMeLength - 1
                                }
                            }
                            //use case if front end gives unlike more than one time ....
                            if (data.afterLikedMeLength == 0 && req.body.requestType === "unlike") {
                                update.$set.afterLikedMeLength = 0
                            }
                            user.findByIdAndUpdate({
                                _id: mongoose.Types.ObjectId(req.body.like)
                            }, update, (err, afterLikedMeResult) => {
                                callback(null, "done")
                            })
                        } else {

                            user.findByIdAndUpdate({
                                _id: mongoose.Types.ObjectId(req.body.like)
                            }, {
                                    $set: {
                                        afterLikedMeLength: afterLikedMeResult.afterLikedMeLength + 1
                                    }
                                }, (err, afterLikedMeResult) => {
                                    callback(null, "done")
                                })
                        }
                    } else {
                        return commonFile.responseHandler(res, 200, "No user found.");
                    }
                })
            }, (data, callback) => {
                user.findByIdAndUpdate({
                    _id: mongoose.Types.ObjectId(req.body.likedBy)
                }, updatemyLikes, (err, aftermyLikesResult) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    else if (aftermyLikesResult) {

                        callback(null, "done")
                    } else {
                        return commonFile.responseHandler(res, 200, "No user found.");
                    }
                })
            }], (err, result) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.")
                else
                    return commonFile.responseHandler(res, 200, "Success");
            })


        },


        //*** user can show profile of others users from a given list of users that is unlocked to a loggedin user ********/
        viewUser: (req, res) => {
            if (!req.body.view || !req.body.viewedBy) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }
            user.findOne({
                _id: req.body.view
            }, (err, result) => {
                if (err) {
                    return commonFile.responseHandler(res, 400, "Internal server error.")
                } else if (result) {

                    if (req.body.view === req.body.viewedBy) {
                        return commonFile.responseHandler(res, 200, "Success", result)
                    }
                    //    check users is already present in viewedMe array or not
                    let index = result.viewedMe.findIndex((x) => x.user == req.body.viewedBy)
                    if (index != -1) {
                        return commonFile.responseHandler(res, 200, "Success", result);
                    } else {

                        user.findOneAndUpdate({
                            _id: mongoose.Types.ObjectId(req.body.view)
                        },
                            // push a user in viewedMe array if user see to other user
                            {
                                $push: {
                                    viewedMe: {
                                        user: mongoose.Types.ObjectId(req.body.viewedBy)
                                    }
                                },
                                // incerase the value  of afterViewedMeLength for front end that show on button.........
                                $inc: {
                                    afterViewedMeLength: 1
                                }
                            }, {
                                new: true
                            }, (err, finalResult) => {
                                if (err)
                                    return commonFile.responseHandler(res, 400, "Internal server error.")
                                else if (finalResult) {
                                    return commonFile.responseHandler(res, 200, "You have been view user successfully");
                                } else {
                                    return commonFile.responseHandler(res, 200, "No user found.");
                                }
                            })
                    }

                } else {
                    return commonFile.responseHandler(res, 200, "No user found.");
                }
            })

        },

        //*********                        user presss viewedMe button at frontEnd and can see a list of users those ..........*******************/

        viewedMe: (req, res) => {
            let n = req.body.pageNumber || 1;
            let m = req.body.pageLimit || 35;
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }

            let query = {
                _id: req.body._id
            }

            user.findOne({
                _id: mongoose.Types.ObjectId(req.body._id),
                status: "ACTIVE"
            }, (err, oneId) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.", err);
                else if (!oneId)
                    return commonFile.responseHandler(res, 200, "User not found.");
                else {
                    let updateObj = {
                        isUnlockedAll: false,
                        afterViewedMeLength: 0
                    }
                    // show a key at frontEnd that is decided user has take subsciption or not 
                    if (oneId.subscriptionPeriod) {

                        if (Date.now() - oneId.subscriptionPeriod >= 0) {
                            updateObj.isUnlockedAll = false
                        } else {
                            updateObj.isUnlockedAll = true
                        }
                    }
                    let options = {
                        lean: true,
                        populate: 'viewedMe.user'
                    }
                    user.findOneAndUpdate({
                        _id: mongoose.Types.ObjectId(req.body._id),
                        status: "ACTIVE"
                    }, updateObj, options).exec((err, result) => {
                        if (err)
                            return commonFile.responseHandler(res, 400, "Internal server error.");
                        else if (!result) {
                            return commonFile.responseHandler(res, 200, "User not found.")
                        } else {

                            let blockedIndex = -1;
                            let reportIndex = -1;
                            let reportedByIndex = -1;
                            //check blocked array and splice those users from result
                            result.blocked.map((x) => {
                                blockedIndex = result.viewedMe.findIndex((y) => y.user._id.toString() == x.user.toString());
                                if (blockedIndex != -1) {
                                    result.viewedMe.splice(blockedIndex, 1)

                                }

                            })
                            //check  reportUser array and splice those users from result
                            result.reportUser.map((x) => {
                                reportIndex = result.viewedMe.findIndex((y) => y.user._id.toString() == x.userId.toString());
                                if (reportIndex != -1) {
                                    result.viewedMe.splice(reportIndex, 1)

                                }

                            })
                            //check  reportedBy array and splice those users from result
                            result.reportedBy.map((x) => {
                                reportedByIndex = result.viewedMe.findIndex((y) => y.user._id.toString() == x.userId.toString());
                                if (reportedByIndex != -1) {
                                    result.viewedMe.splice(reportedByIndex, 1)

                                }

                            })
                            //check  ViewedMe array and give a key isUnLocked true or false 
                            result.viewedMe.map((x) => {
                                var index = oneId.unlockedUsers.findIndex((y) => x.user._id.toString() == y.toString());
                                if (index != -1) {

                                    x.user.isUnlocked = true

                                } else {

                                    x.user.isUnLocked = false
                                }
                                return;
                            })
                            //check my likes array and give a key isLked true or false
                            result.viewedMe.map((x) => {
                                var index1 = oneId.myLikes.findIndex((y) => x.user._id.toString() == y.user.toString());
                                if (index1 == -1) {
                                    // console.log("index1====>",index1)
                                    x.user.isLiked = false
                                } else {
                                    // console.log("index1",index1)
                                    x.user.isLiked = true
                                }
                                return;
                            })
                            // custom pagination
                            let showData = result.viewedMe.slice((n - 1) * m, n * m);
                            let finalResult = {
                                'isSubscribed': updateObj.isUnlockedAll,
                                'viewedMeLength': result.viewedMe.length,
                                'result': showData,
                                'page': n,
                                'total': result.viewedMe.length,
                                'pages': Math.ceil(result.viewedMe.length / m),
                                'limit': m
                            }
                            return commonFile.responseHandler(res, 200, 'You have been viewed by these users.', finalResult);
                        }
                    })
                }
            })

        },


        //*********                        user presss likedMe button at frontEnd and can see a list of users those ..........*******************/
        likedMe: (req, res) => {
            let n = req.body.pageNumber || 1;
            let m = req.body.pageLimit || 35;
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }

            let query = {
                _id: req.body._id
            }

            user.findOne({
                _id: mongoose.Types.ObjectId(req.body._id),
                status: "ACTIVE"
            }, (err, oneId) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.", err);
                else if (!oneId)
                    return commonFile.responseHandler(res, 200, "User not found.");
                else {

                    let updateObj = {
                        isUnlockedAll: false,
                        afterLikedMeLength: 0
                    }

                    // show a key at frontEnd that is decided user has take subsciption or not
                    if (oneId.subscriptionPeriod) {

                        if (Date.now() - oneId.subscriptionPeriod >= 0) {
                            updateObj.isUnlockedAll = false
                        } else {
                            updateObj.isUnlockedAll = true
                        }
                    }
                    let options = {
                        lean: true,
                        populate: 'likedMe.user'
                    }
                    user.findOneAndUpdate({
                        _id: mongoose.Types.ObjectId(req.body._id),
                        status: "ACTIVE"
                    }, updateObj, options).exec((err, result) => {
                        if (err)
                            return commonFile.responseHandler(res, 400, "Internal server error.");
                        else if (!result) {
                            return commonFile.responseHandler(res, 200, "User not found.")
                        } else {


                            let blockedIndex = -1;
                            let reportIndex = -1;
                            let reportedByIndex = -1;

                            //check blocked array and splice those users from result
                            result.blocked.map((x) => {
                                blockedIndex = result.likedMe.findIndex((y) => y.user._id.toString() == x.user.toString());
                                if (blockedIndex != -1) {
                                    result.likedMe.splice(blockedIndex, 1)

                                }

                            })

                            //check reportUser array and splice those users from result

                            result.reportUser.map((x) => {

                                reportIndex = result.likedMe.findIndex((y) => y.user._id.toString() == x.userId.toString());
                                if (reportIndex != -1) {
                                    result.likedMe.splice(reportIndex, 1)

                                }

                            })

                            //check  reportedBy array and splice those users from result
                            result.reportedBy.map((x) => {

                                reportedByIndex = result.likedMe.findIndex((y) => y.user._id.toString() == x.userId.toString());
                                if (reportedByIndex != -1) {
                                    result.likedMe.splice(reportedByIndex, 1)

                                }

                            })

                            //check  likedMe array and give a key isUnLocked true or false 
                            result.likedMe.map((x) => {

                                var index = oneId.unlockedUsers.findIndex((y) => x.user._id == y);

                                if (index != -1) {

                                    x.user.isUnlocked = true

                                } else {
                                    x.user.isUnLocked = false
                                }
                                return;
                            })
                            //check likedMe array and give a key isLked true or false
                            result.likedMe.map((x) => {
                                var index1 = oneId.myLikes.findIndex((y) => x.user._id == y.user.toString());

                                if (index1 == -1) {

                                    x.user.isLiked = false
                                } else {

                                    x.user.isLiked = true
                                }
                                return;
                            })
                            // custom paginations for result
                            let showData = result.likedMe.slice((n - 1) * m, n * m);
                            let finalResult = {
                                'isSubscribed': updateObj.isUnlockedAll,
                                'likedMeLength': result.likedMe.length,
                                'result': showData,
                                'page': n,
                                'total': result.likedMe.length,
                                'pages': Math.ceil(result.likedMe.length / m),
                                'limit': m
                            }
                            return commonFile.responseHandler(res, 200, 'You have been liked by these users.', finalResult);
                        }
                    })
                }
            })

        },


        //*********                        user presss my likes button and can see a list of users those ..........*******************/
        myLikes: (req, res) => {
            let n = req.body.pageNumber || 1;
            let m = req.body.pageLimit || 35;
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }

            let query = {
                _id: mongoose.Types.ObjectId(req.body._id),
                // status: "ACTIVE"
            }

            user.findOne(query, (err, oneId) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.", err);
                else if (!oneId)
                    return commonFile.responseHandler(res, 409, "User not found.");
                else {

                    let updateObj = {
                        isUnlockedAll: false,
                        afterMyLikesLength: 0
                    }

                    if (oneId.subscriptionPeriod) {
                        // show a key at frontEnd that is decided user has take subsciption or not
                        if (Date.now() - oneId.subscriptionPeriod >= 0) {
                            updateObj.isUnlockedAll = false
                        } else {
                            updateObj.isUnlockedAll = true
                        }
                    }
                    let options = {
                        lean: true,
                        populate: 'myLikes.user'
                    }
                    user.findOneAndUpdate(query, updateObj, options).exec((err, result) => {
                        if (err)
                            return commonFile.responseHandler(res, 400, "Internal server error.");
                        else if (!result) {
                            return commonFile.responseHandler(res, 200, "User not found.")
                        } else {


                            let blockedIndex = -1;
                            let reportIndex = -1;
                            let reportedByIndex = -1;

                            //check blocked array and splice those users from result

                            result.blocked.map((x) => {
                                blockedIndex = result.myLikes.findIndex((y) => y.user._id.toString() == x.user.toString());
                                if (blockedIndex != -1) {
                                    result.myLikes.splice(blockedIndex, 1)

                                }

                            })

                            //check  reportUser array and splice those users from result
                            result.reportUser.map((x) => {

                                reportIndex = result.myLikes.findIndex((y) => y.user._id.toString() == x.userId.toString());
                                if (reportIndex != -1) {
                                    result.myLikes.splice(reportIndex, 1)

                                }

                            })
                            //check reportedBy array and splice those users from result
                            result.reportedBy.map((x) => {

                                reportedByIndex = result.myLikes.findIndex((y) => y.user._id.toString() == x.userId.toString());
                                if (reportedByIndex != -1) {
                                    result.myLikes.splice(reportedByIndex, 1)

                                }

                            })
                            //check  myLikes array and give a key isUnlocked true or false
                            result.myLikes.map((x) => {

                                var index = oneId.unlockedUsers.findIndex((y) => x.user._id == y);

                                if (index == -1) {
                                    x.user.isUnlocked = false

                                } else {
                                    x.user.isUnLocked = true
                                }
                                return;
                            })
                            //check myLikes array and give a key isLked true or false

                            result.myLikes.map((x) => {
                                var index1 = oneId.myLikes.findIndex((y) => x.user._id == y.user.toString());

                                if (index1 == -1) {
                                    x.user.isLiked = false
                                } else {
                                    x.user.isLiked = true
                                }
                                return;
                            })
                            // custom pagination
                            let showData = result.myLikes.slice((n - 1) * m, n * m);

                            let finalResult = {
                                'isSubscribed': updateObj.isUnlockedAll,
                                'myLikesLength': result.myLikes.length,
                                'result': showData,
                                'page': n,
                                'total': result.myLikes.length,
                                'pages': Math.ceil(result.myLikes.length / m),
                                'limit': m
                            }
                            return commonFile.responseHandler(res, 200, 'Your likes.', finalResult);
                        }
                    })
                }
            })

        },
        //********            show at list of block users when user press blockUser button at front                   *********/

        blockUserList: (req, res) => {
            let n = req.body.pageNumber || 1;
            let m = req.body.pageLimit || 35;
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters missing");
            }

            let query = {
                _id: req.body._id
            }

            user.findOne({
                _id: mongoose.Types.ObjectId(req.body._id),
                status: "ACTIVE"
            }, (err, oneId) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.", err);
                else if (!oneId)
                    return commonFile.responseHandler(res, 409, "user not found.");
                else {
                    let updateObj = {
                        isUnlockedAll: false,
                    }
                    // show a key at frontEnd that is decided user has take subsciption or not
                    if (oneId.subscriptionPeriod) {

                        if (Date.now() - oneId.subscriptionPeriod >= 0) {
                            updateObj.isUnlockedAll = false
                        } else {
                            updateObj.isUnlockedAll = true
                        }
                    }
                    let options = {
                        lean: true,
                        populate: 'blocked.user'
                    }

                    user.findOneAndUpdate({
                        _id: mongoose.Types.ObjectId(req.body._id),
                        status: "ACTIVE"
                    }, updateObj, options).exec((err, result) => {
                        if (err)
                            return commonFile.responseHandler(res, 400, "Internal server error.");
                        else if (!result) {
                            return commonFile.responseHandler(res, 200, "User not found.")
                        } else {
                            //  custom pagination
                            let showData = result.blocked.slice((n - 1) * m, n * m);
                            //    check unlockedUsers and  adding keys for frontEnd
                            showData.map((x) => {

                                var index = oneId.unlockedUsers.findIndex((y) => x._id == y);

                                if (index == -1) {
                                    x.user.isUnlocked = false

                                } else {
                                    x.user.isUnLocked = true
                                }
                                return;
                            })
                            //check my likes array and give a key isLked true or false
                            showData.map((x) => {

                                var index1 = oneId.myLikes.findIndex((y) => x._id == y.user.toString());

                                if (index1 == -1) {
                                    x.user.isLiked = false
                                } else {
                                    x.user.isLiked = true
                                }
                                return;
                            })
                            let finalResult = {
                                'isSubscribed': updateObj.isUnlockedAll,
                                'result': showData,
                                'page': n,
                                'total': result.blocked.length,
                                'pages': Math.ceil(result.blocked.length / m),
                                'limit': m
                            }
                            return commonFile.responseHandler(res, 200, 'This is your blocked user list.', finalResult);
                        }
                    })
                }
            })

        },

        //********       at front end a users blocked list maybe shown and from there block/unblock operations will be performed.  *******
        blockUnblockUser: (req, res) => {
            let update = {};
            let update1 = {};
            let update2 = {};
            let update3 = {};
            if (!req.body.block || !req.body.blockedBy || !req.body.requestType) {
                return commonFile.responseHandler(res, 400, "Error: Parameters missing");
            }
            if (req.body.requestType === "block") {
                /*
                if requestType is block
                then user push in block array 
                */
                update = {
                    $addToSet: {
                        blocked: {
                            user: mongoose.Types.ObjectId(req.body.block)
                        }
                    },

                },
                    /*
                     user push in blocked array to another user 
                    */

                    update1 = {
                        $addToSet: {
                            blocked: {
                                user: mongoose.Types.ObjectId(req.body.blockedBy)
                            }
                        }
                    },

                    /*
                 remove user from likedMe, myLikes ,viewedMe array  for another user
                */
                    update2 = {
                        $pull: {
                            myLikes: {
                                user: mongoose.Types.ObjectId(req.body.blockedBy)
                            },
                            likedMe: {
                                user: mongoose.Types.ObjectId(req.body.blockedBy)
                            },
                            viewedMe: {
                                user: mongoose.Types.ObjectId(req.body.blockedBy)
                            }
                        }
                    },
                    /*
                 remove user from likedMe, myLikes ,viewedMe array  
                */
                    update3 = {
                        $pull: {
                            myLikes: {
                                user: mongoose.Types.ObjectId(req.body.block)
                            },
                            likedMe: {
                                user: mongoose.Types.ObjectId(req.body.block)
                            },
                            viewedMe: {
                                user: mongoose.Types.ObjectId(req.body.block)
                            }
                        }
                    }
            } else if (req.body.requestType === "unblock") {
                /*
                if requestType is unblock
                then user remove from  block array 
                */
                update = {
                    $pull: {
                        blocked: {
                            user: mongoose.Types.ObjectId(req.body.block)
                        }
                    },


                },
                    /*
                     user remove from blockedBy array to another user 
                    */
                    update1 = {
                        $pull: {
                            blocked: {
                                user: mongoose.Types.ObjectId(req.body.blockedBy)
                            }
                        }
                    },
                    /*
                 user add add in myLikes, likedme, viewedMe array for another user 
                */
                    update2 = {
                        $push: {
                            myLikes: {
                                user: mongoose.Types.ObjectId(req.body.blockedBy)
                            },
                            likedMe: {
                                user: mongoose.Types.ObjectId(req.body.blockedBy)
                            },
                            viewedMe: {
                                user: mongoose.Types.ObjectId(req.body.blockedBy)
                            }
                        }
                    },
                    /*
                 user add add in myLikes, likedme, viewedMe array 
                */
                    update3 = {
                        $push: {
                            myLikes: {
                                user: mongoose.Types.ObjectId(req.body.block)
                            },
                            likedMe: {
                                user: mongoose.Types.ObjectId(req.body.block)
                            },
                            viewedMe: {
                                user: mongoose.Types.ObjectId(req.body.block)
                            }
                        }
                    }

            } else {
                return commonFile.responseHandler(res, 400, "Invalid request type");
            }

            user.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(req.body.block),
                status: "ACTIVE"
            }, update1, {
                    new: true
                }, (err_, result_) => {
                    if (err_) {
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    } else if (!result_) {
                        return commonFile.responseHandler(res, 200, "No user found.");
                    } else {

                        user.findOneAndUpdate({
                            _id: mongoose.Types.ObjectId(req.body.blockedBy),
                            status: "ACTIVE"
                        }, update, {
                                new: true
                            }, (err, result) => {

                                if (err) {

                                    return commonFile.responseHandler(res, 400, "Internal server error.")
                                } else if (!result) {

                                    return commonFile.responseHandler(res, 200, "No user found.");
                                } else {

                                    user.findOneAndUpdate({
                                        _id: mongoose.Types.ObjectId(req.body.block),
                                        status: "ACTIVE"
                                    }, update2, {
                                            new: true
                                        }, (err__, result__) => {
                                            if (err__) {
                                                return commonFile.responseHandler(res, 400, "Internal server error.")
                                            } else if (!result__) {
                                                return commonFile.responseHandler(res, 200, "No user found.");
                                            } else {


                                                user.findOneAndUpdate({
                                                    _id: mongoose.Types.ObjectId(req.body.blockedBy),
                                                    status: "ACTIVE"
                                                }, update3, {
                                                        new: true
                                                    }, (err___, result___) => {
                                                        if (err___) {
                                                            return commonFile.responseHandler(res, 400, "Internal server error.")
                                                        } else if (!result___) {
                                                            return commonFile.responseHandler(res, 200, "No user found.");
                                                        } else {
                                                            if (req.body.requestType === "unblock") {
                                                                return commonFile.responseHandler(res, 200, "User has been unblocked successfully.");
                                                            }
                                                            if (req.body.requestType === "block") {
                                                                return commonFile.responseHandler(res, 200, "User has been blocked successfully.");
                                                            }
                                                        }
                                                    })

                                            }
                                        })

                                }
                            })
                    }
                })

        },

        //************************** buy package api *****************************/
        buyPackage: (req, res) => {
            if (!req.body.transactionId || !req.body.packageId || !req.body.userId || !req.body.amount || !req.body.coinsQty) {

                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }
            async.waterfall([(callback) => {
                new packageTransactions({
                    transactionId: req.body.transactionId,
                    packageBought: mongoose.Types.ObjectId(req.body.packageId),
                    amount: Number(req.body.amount),
                    coinsQty: Number(req.body.coinsQty),
                    madeBy: mongoose.Types.ObjectId(req.body.userId)
                }).save((err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal server error.");
                    console.log(result)
                    callback(null, "done")

                })
            }, (data, callback) => {
                user.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(req.body.userId)
                }, {
                        $inc: {
                            coins: Number(req.body.coinsQty)
                        }
                    }, {
                        new: true
                    }).lean().exec((err, result) => {
                        console.log(result)
                        if (err)
                            return commonFile.responseHandler(res, 400, "Internal server error.")
                        else if (result) {
                            callback(null, result)

                        } else {
                            return commonFile.responseHandler(res, 200, "No user found.");
                        }
                    })
            }], (err, result) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.")
                console.log(result);
                return commonFile.responseHandler(res, 200, "Success", {
                    newCoinsCount: result.coins
                });
            })
        },
        //new for check
        buyPackage: (req, res) => {
            if (!req.body.transactionId || !req.body.packageId || !req.body._id || !req.body.amount) {
                return commonFile.responseHandler(res, 400, "Parameters missing.");
            }
            new packageTransactions({
                transactionId: req.body.transactionId,
                packageBought: mongoose.Types.ObjectId(req.body.packageId),
                amount: Number(req.body.amount),
                madeBy: mongoose.Types.ObjectId(req.body._id)
            }).save((err, result) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.");
                console.log(result)
                return commonFile.responseHandler(res, 200, "Success", result)

            })

        },


        //*****************************boost me details fetch api *****************************/

        boostMeDetailFetch: (req, res) => {
            console.log("boostMeDeailFetch===>>", req.body)
            var boostObj = {}
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameter missing.");
            }
            user.findOne({
                _id: req.body._id
            }, {
                    likedMe: 1,
                    viewedMe: 1,
                    coins: 1,
                    photos: 1
                }).exec(
                    (err, result) => {
                        if (err) {
                            return commonFile.responseHandler(res, 400, "Internal server error.");
                        } else {
                            console.log("result===>", result);
                            boostObj.userDetails = result;
                            boost.find({}, ['boostQty', 'boostValueInCoins', 'boostDiscount', 'boostName'], // Columns to Return
                                {
                                    sort: {
                                        boostQty: 1 //Sort by Date Added DESC
                                    }
                                }, (err, result) => {
                                    if (err)
                                        return commonFile.responseHandler(res, 400, "Internal server error.");
                                    else
                                        boostObj.boost = result;
                                    return commonFile.responseHandler(res, 200, "You have been take boost successfully.", boostObj);
                                })
                        }
                    })
        },


        //*******                                   user can take boost and pay coins for boost                  ********************/
        boostMe: (req, res) => {
            if (!req.body._id || !req.body.coinsTobePaid || !req.body.boost || !req.body.boostName) {
                return commonFile.responseHandler(res, 400, "Parameter missing.");
            }
            user.findOne({
                _id: req.body._id,
                status: "ACTIVE"
            }, {
                    coins: 1
                }).lean().exec((err, result) => {
                    if (err) {
                        return commonFile.responseHandler(res, 400, "Internal server error.");
                    } else if (!result) {
                        return commonFile.responseHandler(res, 400, "User not found.");
                    } else {
                        // check user has coins in your wallet or not
                        if (result.coins < req.body.coinsTobePaid) {
                            result.is_Enoughcoins = false
                            return commonFile.responseHandler(res, 200, "Sorry not enough coins in your wallet.", result);
                        } else {
                            // dcerase coins and add boost value in user account
                            user.findByIdAndUpdate({
                                _id: req.body._id
                            }, {
                                    $inc: {
                                        coins: -req.body.coinsTobePaid,
                                        boost: req.body.boost
                                    }
                                }, {
                                    new: true
                                }, (err, result1) => {
                                    if (err) {
                                        return commonFile.responseHandler(res, 400, "Internal server error.");
                                    } else {
                                        new boostPurchases({
                                            boostName: req.body.boostName,
                                            coinsPaid: req.body.coinsTobePaid,
                                            boostQty: req.body.boost,
                                            purchaseBy: req.body._id,
                                        }).save((err2, result2) => {
                                            if (err2) {
                                                return commonFile.responseHandler(res, 400, "Internal server error.")
                                            } else {
                                                // console.log("========",result)
                                                let remainCoin = {}
                                                remainCoin.coins = result1.coins
                                                remainCoin.boost = result1.boost
                                                remainCoin.is_Enoughcoins = true
                                                return commonFile.responseHandler(res, 200, "You have been added boost successfully.", remainCoin);

                                            }
                                        })


                                    }
                                })
                        }
                    }
                })

        },



        // buyBoost: (req, res) => {
        //     if (!req.body.boostId || !req.body.userId || !req.body.coinsToBePaid || !req.body.boostQty) {
        //         return commonFile.responseHandler(res, 400, "Error: Parameters missing");
        //     }
        //     async.waterfall([(callback) => {
        //         user.findOne({ _id: mongoose.Types.ObjectId(req.body.userId), status: "ACTIVE" }, { coins: 1 }, (err, result) => {
        //             console.log(result)
        //             if (err)
        //                 return commonFile.responseHandler(res, 400, "Error")
        //             else if (result) {
        //                 if (result.coins >= Number(req.body.coinsToBePaid)) {
        //                     callback(null, "done")
        //                 } else {
        //                     return commonFile.responseHandler(res, 400, "Error: Not enough coins")
        //                 }
        //             } else {
        //                 return commonFile.responseHandler(res, 200, "Error: No user found");
        //             }
        //         })
        //     }, (data1, callback) => {
        //         new boostPurchases({
        //             boostBought: mongoose.Types.ObjectId(req.body.boostId),
        //             boostQty: Number(req.body.boostQty),
        //             coinsPaid: Number(req.body.coinsToBePaid),
        //             madeBy: mongoose.Types.ObjectId(req.body.userId)
        //         }).save((err, result) => {
        //             if (err)
        //                 return commonFile.responseHandler(res, 400, "Internal Server Error");
        //             console.log(result)
        //             callback(null, "done")
        //             // return commonFile.responseHandler(res,200,"Success")
        //         })
        //     }, (data2, callback) => {
        //         //if a user could do a transaction then his status is definitely ACTIVE hence not checking that.
        //         user.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.userId) }, { $inc: { boost: Number(req.body.boostQty), coins: -Number(req.body.coinsToBePaid) }, $set: { boostApplyTime: Date.now() } }, { new: true }).lean().exec((err, result) => {
        //             console.log(result)
        //             if (err)
        //                 return commonFile.responseHandler(res, 400, "Error")
        //             else if (result) {
        //                 callback(null, result)
        //                 // return commonFile.responseHandler(res, 200, "Success");
        //             } else {
        //                 return commonFile.responseHandler(res, 200, "Error: No user found");
        //             }
        //         })
        //     }], (err, result) => {
        //         if (err)
        //             return commonFile.responseHandler(res, 400, "Error")
        //         console.log(result);
        //         return commonFile.responseHandler(res, 200, "Success", { newBoostCount: result.boost, newCoinsCount: result.coins });
        //     })
        // },
        // ********************************  getReferralCode api ********************
        getReferralCode: (req, res) => {
            if (!req.body.userId) {
                return commonFile.responseHandler(res, 400, "Error: Parameters missing");
            }
            user.findOne({
                _id: mongoose.Types.ObjectId(req.body.userId),
                status: "ACTIVE"
            }, {
                    referralCode: 1
                }, (err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Error")
                    else if (result) {
                        console.log(result);
                        return commonFile.responseHandler(res, 200, "Success", {
                            referralCode: result.referralCode
                        });
                    } else {
                        return commonFile.responseHandler(res, 400, "Error: No user found")
                    }
                })
        },
        //****************************check referral api ********************************************/
        checkReferralValid: (req, res) => {
            if (!req.body.referredTo || !req.body.referralCode) {
                return commonFile.responseHandler(res, 400, "Error: Parameters missing");
            }
            user.findOne({
                _id: req.body.referredTo,
                status: "ACTIVE"
            }, {
                    referralTaken: 1
                }, (err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error");
                    else if (result) {
                        console.log(result)
                        if (result.referralTaken === false) {
                            return commonFile.responseHandler(res, 200, "Success: User has not taken the referral from anyone");
                        } else {
                            return commonFile.responseHandler(res, 400, "Error: User has already taken the referral");
                        }
                    } else {
                        return commonFile.responseHandler(res, 400, "Error: No user found");
                    }

                })
        },

        // saveReferrals:(req,res)=>{
        //     if(!req.body.referredTo||!req.body.referredBy||!req.body.referralCodeUsed){
        //         return commonFile.responseHandler(res, 400, "Error: Parameters missing");
        //     }
        //     new referral({
        //         referredTo:req.body.referredTo,
        //         referredBy:req.body.referredBy,
        //         referralCodeUsed:req.body.referralCodeUsed
        //     }).save((err,result)=>{
        //         if(err)
        //             return commonFile.responseHandler(res, 400, "Internal Server Error"); 
        //         console.log(result)
        //         return commonFile.responseHandler(res, 200, "Success"); 
        //     })

        //     user.find({_id:})
        // },

        // deActivateAccount: (req, res) => {
        //     user.findOneAndUpdate({
        //         _id: mongoose.Types.ObjectId(req.body._id),
        //         status: "ACTIVE"
        //     }, {
        //         $set: {
        //             status: "DELETED"
        //         }
        //     }, {
        //         new: true
        //     }, (err, result) => {
        //         if (err)
        //             return commonFile.responseHandler(res, 400, "Internal server error")
        //         else if (result) {
        //             return commonFile.responseHandler(res, 200, "Account deactivated successfully");
        //         } else {
        //             return commonFile.responseHandler(res, 400, "Error: No user found")
        //         }
        //     })
        // },
        //******************************************rating  api for user ***************************************/
        giveRatings: (req, res) => {
            user.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(req.body._id),
                userToken: req.body.token
            }, {
                    $set: {
                        ratingsGiven: req.body.ratings
                    }
                }, {
                    new: true
                }, (err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Error: Parameters Missing")
                    return commonFile.responseHandler(res, 200, "Success");
                })
        },
        //*************************************** afeedBack api **************************************************/
        sendFeedback: (req, res) => {
            if (!req.body.email || !req.body.subject || !req.body.message) {
                return commonFile.responseHandler(res, 400, "Error: Parameters Missing")
            }
            commonFile.sendEmail(req.body.email, req.body.subject, req.body.message, undefined, req.body.cc, req.body.bcc, (data) => {
                if (data) {
                    console.log(data);
                    return commonFile.responseHandler(res, 200, "Success")
                } else {
                    return commonFile.responseHandler(res, 400, "Error: Try Again")
                }
            })
        },


        //*************************************************** add packagetoUser api 
        addPackageToUser: (req, res) => {
            if (!req.body.userId || !req.body.packageId || !req.body.amountSpent)
                return commonFile.responseHandler(res, 400, "Error: Parameters Missing")

            async.series([
                (callback) => {
                    user.findOneAndUpdate({
                        _id: req.body.userId,
                        status: "ACTIVE"
                    }, {
                            $push: {
                                packagePurchased: {
                                    packageId: req.body.packageId,
                                    amountSpent: req.body.amountSpent
                                }
                            }
                        }, {
                            new: true
                        }, (err, result) => {
                            if (err)
                                return commonFile.responseHandler(res, 400, "Error: in addPackageToUser findOneAndUpdate")
                            else if (result) {
                                console.log(result);
                                return commonFile.responseHandler(res, 200, "Success")
                                callback(null, result)
                            } else
                                return commonFile.responseHandler(res, 400, "Error: No user found")
                        })
                },
                (callback) => {
                    packages.findOneAndUpdate({
                        _id: req.body.packageId,
                        status: "ACTIVE"
                    }, {
                            $push: {
                                purchasedBy: {
                                    user: req.body.userId
                                }
                            }
                        }, {
                            new: true
                        }, (err, result) => {
                            if (err)
                                return commonFile.responseHandler(res, 400, "Error: in addPackageToUser findOneAndUpdate")
                            else if (result) {
                                console.log(result);
                                return commonFile.responseHandler(res, 200, "Success")
                                callback(null, result)
                            } else
                                return commonFile.responseHandler(res, 400, "Error: No user found")
                        })
                }
            ], (err, result) => {
                if (err)
                    commonFile.responseHandler(res, 400, "Error: In addPackageToUser async series")

            })
        },

        //******************************* shop Api for users ***************************/
        shopList: (req, res) => {
            let query = {
                status: "ACTIVE"
            }
            let options = {
                lean: true,

                sort: {
                    coins: -1
                }
            }
            let n = req.body.pageNumber || 1,
                m = req.body.pageLimit || 35;
            packages.find(query, {
                packagePrice: 1,
                coins: 1,
                _id: 0,
                packageImage: 1,
                status: 1
            }, (err, result) => {
                if (err) {
                    return commonFile.responseHandler(res, 400, "Internal server error.")
                } else if (!result) {
                    return commonFile.responseHandler(res, 200, "No Data Available for shop.")
                } else {
                    // console.log("=++++++++++>>>", result.length)
                    let finalResult = result.slice((n - 1) * m, n * m)
                    let response = {
                        finalResult: finalResult,
                        page: n,
                        limit: m,
                        total: result.length,
                        pages: Math.ceil(result.length / m)
                    }
                    return commonFile.responseHandler(res, 200, "This is your shop list.", response)
                }
            }).sort({
                coins: -1
            })

        },



        // *******                     user can unlock to other users and can show profile of unlocked users                   ***********
        unlockedUser: (req, res) => {
            if (!req.body._id || !req.body.userId) {
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }

            user.findOne({
                _id: req.body._id
            }, (err, result) => {
                if (err) {
                    return commonFile.responseHandler(res, 400, "Internal server error.")
                } else if (!result) {
                    return commonFile.responseHandler(res, 400, "Result not found.")
                } else {
                    //check user is already unlocked or not
                    for (var i = 0; i < result.unlockedUsers.length; i++) {
                        if (result.unlockedUsers[i] == req.body.userId) {
                            return commonFile.responseHandler(res, 400, "User already unlocked.")
                        }
                    }
                    let response = {}
                    // user pay 99 coins to unlock a particular users 
                    if (result.coins >= 99) {
                        var subCoins = result.coins - 99;
                        var bodyData = {
                            coins: subCoins,
                            $addToSet: {
                                unlockedUsers: req.body.userId
                            }
                        }
                        user.update({
                            _id: req.body._id
                        }, bodyData, {
                                new: true
                            }, (err1, result1) => {
                                if (err1) {
                                    return commonFile.responseHandler(res, 400, "Internal server error.")
                                } else if (!result1) {
                                    return commonFile.responseHandler(res, 200, "User details not matched.", result)
                                }
                                response.is_Enoughcoins = true
                                return commonFile.responseHandler(res, 200, "User has been unlocked successfully.", response)
                            })

                    } else {
                        response.is_Enoughcoins = false
                        return commonFile.responseHandler(res, 200, "You have not enoughed coins in your account to unlock user.", response)
                    }
                }
            })
        },
        //******         report user api for users , A user can report to another user for bad activity                   **************
        reportUser: (req, res) => {
            if (!req.body._id) {
                return commonFile.responseHandler(res, 400, "Parameters Missing")
            } else {
                let update = {};
                var aa = [];
                aa.push(req.body.value)
                var query = {};
                query.reportUser = {
                    $each: req.body.value
                }
                user.update({
                    _id: req.body._id
                }, {
                        $addToSet: query
                    }, {
                        new: true
                    }).exec(function (err, result) {
                        if (err) {
                            return commonFile.responseHandler(res, 400, "Internal server error.")
                        } else if (!result) {
                            return commonFile.responseHandler(res, 200, "User not found.")
                        } else {

                            update = {

                                $pull: {
                                    myLikes: {
                                        user: mongoose.Types.ObjectId(req.body.value[0].userId)
                                    },
                                    likedMe: {
                                        user: mongoose.Types.ObjectId(req.body.value[0].userId)
                                    },
                                    viewedMe: {
                                        user: mongoose.Types.ObjectId(req.body.value[0].userId)
                                    }
                                }
                            }
                            user.findOneAndUpdate({
                                _id: req.body._id
                            }, update, {
                                    new: true
                                }, (err_, result_) => {
                                    if (err_) {
                                        return commonFile.responseHandler(res, 400, "Internal server error.")
                                    } else if (!result_) {
                                        return commonFile.responseHandler(res, 200, "User not found.")
                                    } else {
                                        /*
                                        push user in reportedBy array to other side
                                        pull from myLikes ,likedMe ,viewed me to ohter side 
                                        */
                                        user.findOneAndUpdate({
                                            _id: req.body.value[0].userId
                                        }, {
                                                $push: {
                                                    reportedBy: {
                                                        userId: mongoose.Types.ObjectId(req.body._id)
                                                    }
                                                },
                                                $pull: {
                                                    myLikes: {
                                                        user: mongoose.Types.ObjectId(req.body._id)
                                                    },
                                                    likedMe: {
                                                        user: mongoose.Types.ObjectId(req.body._id)
                                                    },
                                                    viewedMe: {
                                                        user: mongoose.Types.ObjectId(req.body._id)
                                                    }
                                                }
                                            }, {
                                                new: true
                                            }, (err_, result_) => {
                                                if (err_) {
                                                    return commonFile.responseHandler(res, 400, "Internal server error.")
                                                } else if (!result_) {
                                                    return commonFile.responseHandler(res, 200, "User not found.")
                                                } else {

                                                    return commonFile.responseHandler(res, 200, "Thank you for your report.", result)
                                                }
                                            })


                                    }
                                })


                        }
                    })
            }
        },

        // *******                           coinsPurchase api for                                                  ************
        coinsPurchase: (req, res) => {

            if (!req.body._id || !req.body.coins || !req.body.transactionId) {
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }

            let query = {
                _id: req.body._id,
                status: "ACTIVE"
            }
            let update = {
                $inc: {
                    coins: req.body.coins
                },
                // transactionId: req.body.transactionId
            }
            user.findOneAndUpdate(query, update, {
                new: true
            }, (err, result) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal server error.")
                else if (!result)
                    return commonFile.responseHandler(res, 409, "User not found.")
                else {

                    return commonFile.responseHandler(res, 200, "success.")
                }

            })
        },

        // ****             connectWihFacebook API,when user want to connect app with facebook                           ***********
        connectWithfacebook: (req, res) => {

            if (!req.body._id || !req.body.facebookId) {
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }
            // update fields of facebook objects those come from  facebook
            let updateObj = {}
            if (req.body.facebookId) {
                updateObj['facebook.facebookId'] = req.body.facebookId
            }

            if (req.body.facebookToken) {
                updateObj['facebook.facebookToken'] = req.body.facebookToken
            }
            if (req.body.facebookName) {
                updateObj['facebook.facebookName'] = req.body.facebookName
                updateObj['userName'] = req.body.facebookName

            }
            if (req.body.deviceToken) {
                updateObj['deviceToken'] = req.body.deviceToken
            }
            if (req.body.deviceType) {
                updateObj['deviceType'] = req.body.deviceType
            }
            if (req.body.facebookPic) {
                updateObj['profilePic'] = req.body.facebookPic
                updateObj['photos.0'] = req.body.facebookPic
            }
            if (req.body.facebookAge) {
                updateObj['age'] = req.body.facebookAge
            }
            if (req.body.facebookGender) {
                updateObj['gender'] = req.body.facebookGender
            }
            if (req.body.facebookNumber) {
                updateObj['facebook.facebookNumber'] = req.body.facebookNumber
            }
            user.findByIdAndUpdate({
                _id: req.body._id
            }, {
                    $set: updateObj
                }, {
                    new: true
                }).select('_id facebook.facebookId').exec((err, result) => {
                    if (err) {
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    } else if (!result) {

                        return commonFile.responseHandler(res, 200, "User not found.")
                    } else {
                        return commonFile.responseHandler(res, 200, "Your account has been connected with facebook successfully.", result)
                    }
                })
        },


        // ****                   updateDeviceToken for notification,when user on notification options                ***********************
        updateDeviceToken: (req, res) => {
            if (!req.body._id || !req.body.token) {
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }
            user.findOneAndUpdate({
                _id: req.body._id
            }, {
                    $set: {
                        deviceToken: req.body.token
                    },
                }, {
                    new: true
                }).select('_id deviceToken').exec((err, result) => {
                    if (err) {
                        return commonFile.responseHandler(res, 400, "Internal server error.")
                    } else if (!result) {
                        return commonFile.responseHandler(res, 200, "User not found.")
                    } else {
                        return commonFile.responseHandler(res, 200, "Your device token has been updated successfully.", result)
                    }
                })
        },


        // ********                                     send a URL when user invite to his friend                  **************
        inviteFriendsUrl: (req, res) => {
            if (!req.body._id || !req.body.sms || !req.body.mail) {
                return commonFile.responseHandler(res, 400, "Parameters Missing.")
            }
            inviteFriend.findOne({
                userId: req.body._id
            }, {}, (err, result) => {
                if (err) {
                    return commonFile.responseHandler(res, 400, "Internal server error.")
                } else if (!result) {
                    new inviteFriend({
                        userId: req.body._id,
                        sms: req.body.sms,
                        // fb: req.body.fb,
                        mail: req.body.mail
                    }).save((err, result) => {
                        if (err) {
                            return commonFile.responseHandler(res, 400, "Internal server error.")
                        } else {
                            user.findOneAndUpdate({
                                _id: req.body._id
                            }, {
                                    $set: {
                                        inviteFr: result._id
                                    }
                                }, (err_, result_) => {
                                    if (err) {
                                        return commonFile.responseHandler(res, 400, "Internal server error.")
                                    } else if (!result) {
                                        return commonFile.responseHandler(res, 200, "User not found.")
                                    } else {
                                        return commonFile.responseHandler(res, 200, "You have been saved successfully for invite your friend.", result)
                                    }
                                })

                        }
                    })
                } else {
                    return commonFile.responseHandler(res, 200, "Details already filled.", result)
                }
            })
        },

        // *******                          user get coins when any user sign up throw a invitation link                      *************
        invitationCoin: (req, res) => {
            inviteFriend.findOne({
                $or: [{
                    sms: req.body.url
                }, {
                    fb: req.body.url
                }, {
                    mail: req.body.url
                }]
            }, {
                    // _id: 0,
                    // __v: 0
                }, (err, result) => {
                    if (err) {
                        return commonFile.responseHandler(res, 400, "Internal server error.", err)
                    } else if (result) {

                        let update;
                        // user come on app throw mail link

                        if (result.mail == req.body.url) {

                            update = {
                                $inc: {
                                    coins: 2
                                }
                            }
                        }
                        // user come on app throw fb link
                        if (result.fb == req.body.url) {
                            update = {
                                $inc: {
                                    coins: 5
                                }
                            }
                        }
                        // user come on app throw sms link
                        if (result.sms == req.body.url) {
                            update = {
                                $inc: {
                                    coins: 1
                                }
                            }
                        }

                        user.update({
                            _id: result.userId
                        }, update, {
                                new: true
                            }, (err, result) => {
                                if (err) {
                                    return commonFile.responseHandler(res, 400, "Internal server error.", err)
                                } else if (!result) {
                                    return commonFile.responseHandler(res, 200, "User not found.")
                                } else {
                                    console.log("URL", req.body.url)
                                    return commonFile.responseHandler(res, 200, "You have been get coins for invitation.")
                                }
                            })
                    } else {

                        return commonFile.responseHandler(res, 200, "Success.")
                    }
                })
        },
        // show a list of premium package that is added by admin  
        showSubscriptionList: (req, res) => {
            // if(req.body.)
            packages.find({
                status: "ACTIVE"
            }, (err, result) => {
                if (err) {
                    return commonFile.responseHandler(res, 400, "Internal server error.", err)
                } else if (!result) {
                    return commonFile.responseHandler(res, 200, "No result found.")
                } else {
                    return commonFile.responseHandler(res, 200, "Success.", result)
                }
            })
        },

        testing: (req, res) => {
            {
                user.findOne({
                    accountID: req.body.accountID,
                    status: "ACTIVE"
                }, (err, result) => {
                    if (err) {
                        return commonFile.responseHandler(res, 200, "errr.", err)
                    } else {
                        var jwtToken;
                        console.log("!@@@@@@@@@@@@@@@")
                        jwtToken = jwt.sign({
                            accountID: req.body.accountID,
                            status: "ACTIVE"
                        }, config.jwtSecretKey);

                        console.log("token===>" + jwtToken)

                        return commonFile.responseHandler(res, 200, "Your device token has been send successfully.", result, jwtToken)
                    }
                })
            }
        }

    }