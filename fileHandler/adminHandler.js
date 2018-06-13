let jwt = require('jsonwebtoken')
let config = require('../config/config-dev.js')
let packages = require('../models/package.js')
const boosts = require('../models/boost')
const async = require('async')
const multer = require('multer')
let user = require('../models/user')
 const boostPurchases=require('../models/boost-purchases.js')
const staticContent = require('../models/staticContent')
const premiumAccount = require('../models/premiumAccount')
const cloudinary = require('cloudinary')
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './i_have_created_this_folder/')
    },
    filename: (req, file, cb) => {
        cb(null, "_" + Date.now())
    }
})
let upload = multer().single('yyzz')

const mongoose = require('mongoose')
const commonFile = require('./commonFile.js')
const admin = require('../models/admin.js')
const product = require('../models/product.js')
const transaction = require('../models/product-transaction')

module.exports = {

    tempRoute: (req, res) => {
        upload(req, res, (err) => {
            if (err)
                console.log(err)
            console.log(req.body)
            console.log(req.file)
            cloudinary.uploader.upload_stream((result) => console.log(result)).end(req.file.buffer)
        })
    },



    // @@@@@@@@@@@@@@@@@@@@@@@  login Api to Open The Admin Panel  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    login: (req, res) => {
        console.log("request body", req.body)
        if (!req.body.email || !req.body.password) {
            return commonFile.responseHandler(res, 401, "Error: Credentials missing")
        }
        admin.findOne({
            email: req.body.email
        }, {
            name: 1,
            email: 1,
            profilePic: 1,
            password: 1,
            accountID: 1,
            location: 1,
            phoneNumber:1,
            createdAt:1
        }).lean().exec((err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Error: In login function")
            else if (result) {
                commonFile.compareHash(req.body.password, result.password, (resultHash) => {
                    if (resultHash === true) {
                        let token = jwt.sign({
                            _id: result._id
                        }, config.jwtSecretKey, {
                            expiresIn: '1000s'
                        })
                        delete result.password
                        result["token"] = token;
                        return commonFile.responseHandler(res, 200, "Successful login", result)
                    } else {
                        return commonFile.responseHandler(res, 400, "Invalid Password")
                    }
                })
            } else
                return commonFile.responseHandler(res, 400, "Invalid Email")
        })
    },




    // @@@@@@@@@@@@@@@@@@@@@@@  forgotPassword Api to to change The password  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    forgotPassword: (req, res) => {
        
        if (!req.body.email) {
            return commonFile.responseHandler(res, 400, "Error: Parameters Missing")
        }
        admin.findOne({ "email": req.body.email }, (err, result) => {
            if (err)
                commonFile.responseHandler(res, 400, "Error: in forgot password")
            else if (result) {
                let link = 'http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:4646/#/resetPassword/' + result._id
                commonFile.sendEmail(req.body.email, "Tap Culture", "Your getFriends Password reset link", "Click on this link to <a href=" + link + ">reset Password</a>", null, null, (result) => {
                    if (result)
                        return commonFile.responseHandler(res, 200, "Success");
                    else
                        return commonFile.responseHandler(res, 400, "Link not sent. Please try again");
                })
            } else
                return commonFile.responseHandler(res, 400, "Error: No user found")
        })
    },





      // @@@@@@@@@@@@@@@@@@@@@@@  resetPassword Api to to change The password  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    resetPassword: (req, res) => {
        console.log("req.body"+JSON.stringify(req.body))
        
        if (!req.body.id || !req.body.password)
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        commonFile.createHash(req.body.password, (err, result) => {
            if (err) {
                console.log("Error in creating hash reset password api", err)
            } else {
                console.log(result)
                admin.findOneAndUpdate({ "_id": req.body.id }, { "password": result }, {new:true}, (err, result) => {
                    if (err)
                        commonFile.responseHandler(res, 400, "Error: resetPassword")
                    else if (result) {
                        commonFile.responseHandler(res, 200, "Success password reset")
                    } else {
                        commonFile.responseHandler(res, 400, "Error: No user found")
                    }
                })
            }
        })
    },





    // @@@@@@@@@@@@@@@@@@@@@@@  blockUnblockUser Api to to change The Status Block/Unblock  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    blockUnblockUser: (req, res) => {
        if (!req.body._id || !req.body.status) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing in blockUnblock")
        }
        user.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, { "status": req.body.status }, { new:true }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Error: blockUnblock API")
            else if (result) {
                return commonFile.responseHandler(res, 200, "Success")
            } else
                return commonFile.responseHandler(res, 400, "Error: no user exists")
        })
    },



    // @@@@@@@@@@@@@@@@@@@@@@@  deleteUser Api to to change The Status Delete  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    deleteUser: (req, res) => {
        console.log("deleteUser req.body====>>>", req.body)
        if (!req.body._id) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing in delete")
        }
        user.findOneAndRemove({
            _id: req.body._id
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error")
            else if (result)
                return commonFile.responseHandler(res, 200, "Success")
            else
                return commonFile.responseHandler(res, 409, "user not found")
        })
    },




    // @@@@@@@@@@@@@@@@@@@@@@@  adminDetail Api to to Show the Details  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    adminDetail:(req,res)=>{

        admin.find({},{phoneNumber:1,location:1,name:1},(err,result)=>{
         if(err){
            return commonFile.responseHandler(res, 400, "Internal server error")
         }
         else if(!result){
            return commonFile.responseHandler(res, 400, "Error: No such user exists")
         }
         else{
            return commonFile.responseHandler(res, 200, "Success: admin details.",result)
         }
        })
    },





    // @@@@@@@@@@@@@@@@@@@@@@@  editProfile Api to to change the Details  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    editProfile: (req, res) => {
        if (!req.body.userName || !req.body.email || !req.body.accountID || !req.body.location || !req.body._id ||!req.body.phoneNumber)
            return commonFile.responseHandler(res, 400, "Error: missing parameters")

        let updateObj = {};
        if (req.body.phoneNumber)
        updateObj.phoneNumber = req.body.phoneNumber;
        if (req.body.userName)
            updateObj.userName = req.body.userName;
        if (req.body.email)
            updateObj.email = req.body.email;
        if (req.body.accountID)
            updateObj.accountID = req.body.accountID;
        if (req.body.location)
            updateObj.location = req.body.location;

        admin.findOneAndUpdate({"_id": "req.body._id" }, {
            $set: {
                updateObj
            }
        }, {
            new: true
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Error: findOneAndUpdate error editProfile")
            else if (result) {
                return commonFile.responseHandler(res, 200, "Success: admin updated")
            } else
                return commonFile.responseHandler(res, 400, "Error: No such user exists")
        })
    },



     // @@@@@@@@@@@@@@@@@@@@@@@  getStaticContent Api  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    getStaticContent: (req, res) => {
        staticContent.find({}, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal server error")
            else {
                return commonFile.responseHandler(res, 200, "Success", result)
            }
        })
    },



    // @@@@@@@@@@@@@@@@@@@@@@@  updateStaticContent Api  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    updateStaticContent: (req, res) => {
        console.log(req.body);
        if (!req.body.field || !req.body.data)
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        let key, obj = {};
        if (req.body.field === "termsAndServices")
            key = "termsAndServices";
        else if (req.body.field === "aboutUs")
            key = "aboutUs"
        else
            key = "contactUs"
        let time = key + "CreatedAt"
        obj = {
            $set: {}
        };
        obj.$set[key] = req.body.data;
        obj.$set[time] = Date.now()
        staticContent.findOneAndUpdate({
            _id: req.body._id
        }, obj, {
            new: true
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Error: In updateStaticContent")
            else if (result) {
                return commonFile.responseHandler(res, 200, "Success: Content Updated")
            } else
                return commonFile.responseHandler(res, 400, "Error: No collection exists")
        })
    },





    // @@@@@@@@@@@@@@@@@@@@@@@  deleteStaticContent Api  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    deleteStaticContent: (req, res) => {
        if (!req.body.type){
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        }
        let type = req.body.type,
            query, updateObj = {
                $set: {}
            };
        console.log(req.body)
        query = {};
        query[req.body.type] = {
            $exists: true
        };
        updateObj.$set[req.body.type] = "";
        console.log(query);
        console.log(updateObj)
        staticContent.findOneAndUpdate(query, updateObj, {
            new: true
        }, (err, result) => {
            if (err) {
                console.log("1111111")
                return commonFile.responseHandler(res, 400, "Error: In deleteStaticContent")
            } else if (result) {
                console.log("2222line", result)
                return commonFile.responseHandler(res, 200, "Success: Content deleted")
            } else {
                console.log("3333333333333")
                return commonFile.responseHandler(res, 400, "Error: No collection exists")
            }
        })
    },






    // @@@@@@@@@@@@@@@@@@@@@@@  addNewProduct Api to add product by admin panel   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    addNewProduct:(req, res)=>{
        // console.log("req.body========>>>>",req.body)
        if (!req.body.createdBy || !req.body.productName || !req.body.productType || !req.body.productPrice || !req.body.productDesc || !req.body.productImage || !req.body.productLink){
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        }

        async.waterfall([(callback)=>{

            admin.findById({ _id:req.body.createdBy }, (err, result)=>{
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal Server Error.")
                else if(!result)
                    return commonFile.responseHandler(res, 409, "admin not found.")
                else
                    callback(null, "done")
            })

        }, (next, callback)=>{

            commonFile.uploadMultipleImages(req.body.productImage, (url)=>{
                if (url != undefined) {
                    req.body.productImage = url;
                    callback(null, "done")
                } 
            })

        }, (next, callback)=>{
            
            var productName = (req.body.productName).toLowerCase();
            var fullName = ""
            let array = productName.split(" ")
            
            var i = 0
            
            do{
                fullName = fullName + array[i].charAt(0).toUpperCase() + array[i].substr(1)+" ";
                i++;
            }while(i<array.length)
            
            req.body.productName = fullName
            
            new product(req.body).save((err, success)=>{
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal Server Error.",err)
                else
                    callback(null, success)
            })

        }], (err, finalResult)=>{
            
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else
                return commonFile.responseHandler(res, 200, "Product Successfully Added.",finalResult)
        })
    },







     // @@@@@@@@@@@@@@@@@@@@@@@  deleteProduct Api to deleteProduct the product   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    deleteProduct:(req, res)=>{
        console.log("req.body========>>>>",req.body)
        product.findByIdAndUpdate({ _id:req.body.productId, status:"ACTIVE" }, { status:"DELETE" }, { new:true }, (err, result)=>{
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else
                return commonFile.responseHandler(res, 200, "Successfully Deleted")
        })
    },






    // @@@@@@@@@@@@@@@@@@@@@@@  productDetail Api to show the product Detail   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    productDetail:(req, res)=>{
        console.log("req.body========>>>>",req.body)
        product.findById({ _id:req.body.productId, status:"ACTIVE" }, (err, result)=>{
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else
                return commonFile.responseHandler(res, 200, "Success", result)
        })

    },






    // @@@@@@@@@@@@@@@@@@@@@@@  productList Api to show the product List with Searching and Filtering and sortBy  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    productList:(req, res)=>{

        let pattern = "\\b[a-z0-9']*" + req.body.search + "[a-z0-9'?]*\\b";
        // let pattern = new RegExp('^'+req.body.search,'i')
        re = new RegExp(pattern, 'gi');

        let query = {}

        
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
    },

    updateProduct:(req, res)=>{
        let query = { _id:req.body.productId }

        product.findByIdAndUpdate(query, req.body, {new:true}, (err, result)=>{
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else if(result)
                return commonFile.responseHandler(res, 200, "Success.", result)
            else
                return commonFile.responseHandler(res, 409, "Product not found.")
        })
    },







     // @@@@@@@@@@@@@@@@@@@@@@@  productName Api to show the Product Name List  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    productNameList:(req, res)=>{

        // let n = req.body.page || 1
        // let m = req.body.limit || 10
        
        let masterQuery = [
            {
                $group: { _id: "$productName", productQuantity: { $sum: 1 } }
            },
            { 
                $sort: {  _id:1 } 
            }
        ]

        product.aggregate(masterQuery, (err, result)=>{
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else{
                
                // pagination start 

                // let showData = result.slice((n-1)*m, n*m)
                // let finalObj = { 
                //     BrandList:showData,
                //     page:n,
                //     limit:m,
                //     total:result.length,
                //     pages:Math.ceil(result.length/m)
                // }
                // return commonFile.responseHandler(res, 200, "Success", finalObj)
                return commonFile.responseHandler(res, 200, "Success", result)
            }
        })

    },






     // @@@@@@@@@@@@@@@@@@@@@@@  getAllUsers Api to show the User List  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    getAllUsers: (req, res) => {

        if (req.body.filterWord) {
            pattern = "\\b[a-z0-9']*" + req.body.filterWord + "[a-z0-9'?]*\\b";
            re = new RegExp(pattern, 'gi');
            query = {
                $or: [{
                    userName: re
                }, {
                    accountID: re
                }, {
                    status: re
                }],
            };
        } else {
            query = {
            };
        }

        user.paginate(query, {
            page: req.body.page,
            limit: 10,
            lean: true
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Error")
            else {
                return commonFile.responseHandler(res, 200, "Success", result)
            }
        })
    },





    // @@@@@@@@@@@@@@@@@@@@@@@  getAllTransactions Api to show the User Transactions  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    getAllTransactions: (req, res) => {
        console.log("req. body========>>>>", req.body)
        let pattern, query, re;
        if (req.body.filterWord) {
            pattern = "\\b[a-z0-9']*" + req.body.filterWord + "[a-z0-9'?]*\\b";
            re = new RegExp(pattern, 'gi');
            query = {
                packageName: re
            };
        } else {
            query = { };
        }
        let options = {
            populate: "purchaseBy",
            page: req.query.page || 1,
            limit: 10
          
        }
        transaction.paginate(query, options, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Error")
            return commonFile.responseHandler(res, 200, "Success", result)
        })
    },



// @@@@@@@@@@@@@@@@@@@@@@@  updateAdmin Api to change the Detail of Admin  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    updateAdmin: (req, res) => {
        console.log("req.body", req.body)
        let updateObj = {};
        if (req.body.name)
            updateObj.name = req.body.name;
        if (req.body.accountID)
            updateObj.accountID = req.body.accountID;
        if (req.body.phoneNumber)
            updateObj.phoneNumber = req.body.phoneNumber;
        if (req.body.location)
            updateObj.location = req.body.location;
        async.waterfall([(cb) => {
            if (req.body.profilePic) {
                commonFile.imageUploadToCloudinary(req.body.profilePic, (url) => {
                    updateObj.profilePic = url
                    cb(null, updateObj);
                })
            } else {
                cb(null, "done")
            }
        }, (data, cb) => {
            console.log("updateObj",updateObj);
            admin.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, updateObj, {new: true,
                projection: {
                    name: 1,
                    accountID: 1,
                    profilePic: 1,
                    location: 1,
                    phoneNumber:1 }
            }, (err, result) => {
                cb(err, result)
            })
        }], (err, result) => {
            console.log("result====================>>>>", result)
            if (err)
                return commonFile.responseHandler(res, 400, "Server Error")
            return commonFile.responseHandler(res, 200, "Success", result);
        })
    },













































    searchFromUserMgmt: (req, res) => {
        console.log(req.body);
        if (!req.body.filterWord)
            return commonFile.responseHandler(res, 400, "Error: Parameters missing in searchFromUserMgmt")
        let pattern, re;
        pattern = "\\b[a-z0-9']*" + req.body.filterWord + "[a-z0-9'?]*\\b";
        re = new RegExp(pattern, 'gi');
        user.find({
            $or: [{
                name: re
            }, {
                accountID: re
            }, {
                status: re
            }]
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Error")
            else if (result.length) {
                return commonFile.responseHandler(res, 200, "Success", result)
            } else {
                return commonFile.responseHandler(res, 400, "No user found")
            }
        })
    },






    addNewPackage: (req, res) => {
        if (!req.body.packageName || !req.body.packagePrice || !req.body.packageDesc ||!req.body.subscriptionPeriod)
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
            
            let pack = new packages({
            packageName: req.body.packageName,
            packagePrice: req.body.packagePrice,
            packageDesc: req.body.packageDesc,
            subscriptionPeriod: (req.body.subscriptionPeriod)*86400000,
            createdBy: mongoose.Types.ObjectId(req.body._id),
          
        })
        commonFile.imageUploadToCloudinary(req.body.packageImage, (url) => {
            if (url != undefined) {
                pack.packageImage = url;
                pack.save((err, result) => {
                    console.log("@@@@@@@@@@@@@", err, result);
                    if (err)
                        return commonFile.responseHandler(res, 400, "Error: saving package")
                    else
                        return commonFile.responseHandler(res, 200, "Success: Package saved")
                })
            } else
                return commonFile.responseHandler(res, 400, "Url cannot be obtained. addNewPackage API")
        })
    },


    addNewBoost: (req, res) => {
        if (!req.body.boostName || !req.body.boostValueInCoins || !req.body.boostDesc || !req.body.boostQty) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        }
        let pack = new boosts({
            boostDiscount: req.body.boostDiscount,
            boostName: req.body.boostName,

            boostDesc: req.body.boostDesc,
            boostQty: Number(req.body.boostQty),
            boostValueInCoins: Number(req.body.boostValueInCoins),
            createdBy: mongoose.Types.ObjectId(req.body._id)
        })
        pack.save((err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Error: saving boost")
            else
                return commonFile.responseHandler(res, 200, "Success: Boost saved")
        })
       
    },

    showBoostList: (req, res) => {
        console.log("dsdfvsd")
        let pattern, re, query;
        if (!req.body.page)
            return commonFile.responseHandler(res, 400, "Peculiar error")

        if (req.body.filterWord) {
            
            pattern = "\\b[a-z0-9']*" + req.body.filterWord + "[a-z0-9'?]*\\b";
            re = new RegExp(pattern, 'gi');
            query = {
                boostName:re,
                status: "ACTIVE"
            };

        } else {
            query = {
                status: "ACTIVE"
            };
        }

        boosts.paginate(query, {
            page: req.body.page,
            limit: 5,
            select: {
                createdAt: 1,
                boostName: 1,
                boostQty: 1,
                boostType: 1,
                boostValueInCoins: 1,
                boostDesc: 1,
                status: 1
            },
            lean: true
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal server error show Boost list API", err)
            return commonFile.responseHandler(res, 200, "Success", result)
        })
    },

    deleteBoost: (req, res) => {
        if (!req.body._id)
            return commonFile.responseHandler(res, 400, "Parameters missing")
        boosts.findOneAndUpdate({
            _id: req.body._id
        }, {
            $set: {
                status: "DELETED"
            }
        }, {
            new: true
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server error")
            return commonFile.responseHandler(res, 200, "Success")
        })
    },



    verifyToken: (req, res, next) => {
        console.log("1111111111111111 here", req.headers.token, "{{{}}", typeof req.headers.token)
        if (req.headers.token == "null" || req.headers.token == "" || req.headers.token == "undefined" || req.headers.token == null || req.headers.token == undefined) {
            return commonFile.responseHandler(res, 400, "Token Missing")
        }
        jwt.verify(req.headers.token, config.jwtSecretKey, (err, decoded) => {
            if (err) {
                return commonFile.responseHandler(res, 400, "Token Invalid")
            } else {
                console.log("Token verified successfully")
                next();
            }
        })
    },

    uploadMultipleImagesCld: (req, res) => {
        if (!req.body) {
            console.log("Error")
        }
        commonFile.imageUploadToCloudinary(req.body.image, (url) => {
            console.log(url);
        })
    },

    multerHandler: (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                console.log(err)
            }
        })
    },


    getAllPackages: (req, res) => {
        let pattern, re, query;
        if (!req.body.page)
            return commonFile.responseHandler(res, 400, "Peculiar error")
        if (req.body.filterWord) {
            pattern = "\\b[a-z0-9']*" + req.body.filterWord + "[a-z0-9'?]*\\b";
            re = new RegExp(pattern, 'gi');
            query = {
                $or: [{
                    packageName: re
                }, {
                    packageType: re
                }, {
                    packagePrice: re
                }],
                status: "ACTIVE"
            };
        } 
        else {
            query = {
                status: "ACTIVE"
            };
        }
        packages.paginate(query, {
            page: req.body.page,
            limit: 10,
            select: {
                packageName: 1,
                packageType: 1,
                packagePrice: 1,
                packageImage: 1,
                packageDesc: 1,
                createdAt: 1,
                subscriptionPeriod:1,
                coins: 1,
                status: 1

            },
            lean: true
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal server error get All Packages API")
            return commonFile.responseHandler(res, 200, "Success", result)
        })
    },

    deletePackage: (req, res) => {
        if (!req.body._id)
            return commonFile.responseHandler(res, 400, "Parameters missing")
        packages.findOneAndUpdate({
            _id: req.body._id
        }, {
            $set: {
                status: "DELETED"
            }
        }, {
            new: true
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server error")
            return commonFile.responseHandler(res, 200, "Success")
        })
    },

    viewUserFromView: (req, res) => {
        console.log("hiihihihihihihihihihihihihihih",req.body)
        if (!req.body.user)
            return commonFile.responseHandler(res, 400, "Parameters missing")
        user.findOne({
            _id: mongoose.Types.ObjectId(req.body.user)
        }, {
            userName: 1,
            accountID: 1,
            status: 1,
            location: 1,
            gender:1
        }, (err, result) => {
            console.log(result)
            if (err)
                return commonFile.responseHandler(res, 400, "Internal error viewUserFromView")
            return commonFile.responseHandler(res, 200, "Success", result)
        })
    },

    saveTransactions: (req, res) => {
        if (!req.body.transactionNumber || !req.body.packageName || !req.body.amount || !req.body.madeBy)
            return commonFile.responseHandler(res, 400, "Parameters Missing");
        new transaction(req.body).save((err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal server error")
            return commonFile.responseHandler(res, 200, "Succes: ")
        })
    },

    
    deleteUserFromView: (req, res) => {
        console.log(req.body);
        user.findOneAndUpdate({
            _id: req.body.user
        }, {
            $set: {
                status: req.body.status
            }
        }, {
            new: true
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error")
            console.log(result);
            return commonFile.responseHandler(res, 200, "Success");
        })
        
    },

    getDetailsOfUser: (req, res) => {
        console.log("data received", req.body);
        user.find({
            _id: req.body._id
        }).populate('myFavourite.product').exec((err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server error", err)
            console.log("Am I getting this data", result);
            return commonFile.responseHandler(res, 200, "Success", result);
        })
    },

    

    activeUsers: (req, res) => {
        user.find({
            status: "ACTIVE"
        }).count().lean().exec((err, result) => {
            if (err) {
                return commonFile.responseHandler(res, 400, "Internal Server error")
            }
            console.log(result);
            return commonFile.responseHandler(res, 200, "Succes", result)
        })
    },

   

    addCoins: (req, res) => {
        if (!req.body.shopCoins) {
            return commonFile.responseHandler(res, 400, "Quantity and Price of coin is required");
        }

        var bodyData = req.body;
        coins.create(bodyData, (err, result) => {
            console.log(err, result);
            if (err)
                return commonFile.responseHandler(res, 400, "Internal server error")
            else {
                return commonFile.responseHandler(res, 200, "Coins inserted successfully.", result)
            }
        })
    },


    getAllCoins: (req, res) => {
        coins.find({}, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal server error")
            else {
                return commonFile.responseHandler(res, 200, "Success", result)
            }
        })
    },
    
    getBoostDetail:(req,res)=>{
        console.log("req.body=======>>>>", req.body)
        let pattern, re, query;
        if (req.body.filterWord) {
            console.log("calling")
            console.log("req.body.filterWord====>",req.body.filterWord)
            pattern = "\\b[a-z0-9']*" + req.body.filterWord + "[a-z0-9'?]*\\b";
            re = new RegExp(pattern, 'gi');
            query = {
                boostName: re
                 };
        } 
        else {
            query = { };
        }
        let options = {
            page: req.body.page || 1,
            limit: 5,
            createdAt:-1,
            populate:"purchaseBy"

        }
        boostPurchases.paginate(query, options, (err,result)=>{
            if(err){ 
                console.log("=====....!!!!!!!!!RESULT",err)
                return commonFile.responseHandler(res, 400, "Internal Server Error")
            }
            else if(!result){
               
                return commonFile.responseHandler(res, 409, "user not found")
            }
            else {
                console.log("=====....RESULT",result)
                return commonFile.responseHandler(res, 200, "Success",result)
            }
        })
    },
     
    deactivatedUser: (req, res) => {
        console.log("deactivateUser req.body====>>>", req.body)
        if (!req.body._id) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing in deactivateUser")
        }
        let update = {
            deactivatedBy: "admin"
        }
        user.findOneAndUpdate({
            _id: req.body._id
        }, update, {
            new: true
        }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error")
            else if (result)
                return commonFile.responseHandler(res, 200, "Success")
            else
                return commonFile.responseHandler(res, 409, "user not found")
        })
    },




    totalCollection:(req,res)=>{
        transaction.find({},{amount:1,_id:0},(err,result)=>{
           if(err){
            return commonFile.responseHandler(res, 400, "Internal Server Error")
           }
           else if(!result.length){
               var total=0
            return commonFile.responseHandler(res, 200, "user not found",total)
           }
           else{  
               var total=0;
               
            for(var i=0;i<result.length;i++){
                           total=total+result[i].amount
            }
            return commonFile.responseHandler(res, 200, "Success",total)
           }
        })
    }


}