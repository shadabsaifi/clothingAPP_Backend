let jwt = require('jsonwebtoken')
let config = require('../config/config-dev.js')
let packages = require('../models/package.js')
let brand = require('../models/brand.js')
const boosts = require('../models/boost')
const async = require('async')
const asyncForEach = require("async-for-each");
const multer = require('multer')
let user = require('../models/user')
const boostPurchases = require('../models/boost-purchases.js')
const staticContent = require('../models/staticContent')
const premiumAccount = require('../models/premiumAccount')
const cloudinary = require('cloudinary')
var forEach = require('async-foreach').forEach;
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
const style = require('../models/style.js')
const transaction = require('../models/transaction')
var uniqueArray = require('array-unique');
var sortArray = require('sort-array');

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
        admin.findOne({ email: req.body.email }).lean().exec((err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Error: In login function")
            else if (result) {
                commonFile.compareHash(req.body.password, result.password, (resultHash) => {
                    if (resultHash === true) {
                        // let token = jwt.sign({
                        //     _id: result._id
                        // }, config.jwtSecretKey, {
                        //         expiresIn: '1000s'
                        //     })
                        let token = jwt.sign({
                            _id: result._id
                        }, config.jwtSecretKey)
                        delete result.password
                        result["token"] = token;
                        return commonFile.responseHandler(res, 200, "Successfully login", result)
                    } else {
                        return commonFile.responseHandler(res, 409, "Invalid password")
                    }
                })
            } else
                return commonFile.responseHandler(res, 400, "Invalid Email")
        })
    },





    // @@@@@@@@@@@@@@@@@@@@@@@  adminDetail Api to to Show the Details  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    adminDetail: (req, res) => {

        if (!req.query.adminId) {
            return commonFile.responseHandler(res, 401, "Error: Credentials missing")
        }


        admin.findOne({ _id: req.query.adminId }, (err, result) => {
            if (err) {
                return commonFile.responseHandler(res, 400, "Internal server error")
            }
            else if (!result) {
                return commonFile.responseHandler(res, 409, "No such user exists.")
            }
            else {
                return commonFile.responseHandler(res, 200, "success", result)
            }
        })
    },





    // @@@@@@@@@@@@@@@@@@@@@@@ Admin editProfile Api to to change the Details  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    editProfile: (req, res) => {
        if (!req.body.userName || !req.body.email || !req.body.accountID || !req.body.location || !req.body._id || !req.body.phoneNumber)
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

        admin.findOneAndUpdate({ _id: req.body.adminId }, {
            $set: {
                updateObj
            }
        }, {
                new: true
            }, (err, result) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Error: findOneAndUpdate error editProfile")
                else if (result) {
                    return commonFile.responseHandler(res, 200, "Success update profile.")
                } else
                    return commonFile.responseHandler(res, 409, "No such user exists.")
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
                let link = 'http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:1468/#/resetPassword/' + result._id
                commonFile.sendEmail(req.body.email, "Clothing", "Your getFriends Password reset link", "Click on this link to <a href=" + link + ">reset Password</a>", null, null, (result) => {
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
        // console.log("req.body" + JSON.stringify(req.body))

        if (!req.body.adminId || !req.body.password)
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        commonFile.createHash(req.body.password, (err, result) => {
            if (err) {
                console.log("Error in creating hash reset password api", err)
            } else {
                console.log(result)
                admin.findOneAndUpdate({ "_id": req.body.adminId }, { "password": result }, { new: true }, (err, result) => {
                    if (err)
                        commonFile.responseHandler(res, 400, "Error: resetPassword")
                    else if (result) {
                        commonFile.responseHandler(res, 200, "Password successfully reset")
                    } else {
                        commonFile.responseHandler(res, 409, "No such user exists.")
                    }
                })
            }
        })
    },



    // @@@@@@@@@@@@@@@@@@@@@@@  addNewUser Api  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    addNewUser: (req, res) => {
        console.log("req.body========>>>>", req.body)

        if (!req.body.name || !req.body.email || !req.body.gender || !req.body.age || !req.body.bodyType || !req.body.height || !req.body.weight) {
            return commonFile.responseHandler(res, 400, "Parameter missing.")
        }
        let newUserObj = {
            email: req.body.email,
            age: req.body.age,
            bodyType: req.body.bodyType,
            height: req.body.height,
            weight: req.body.weight,
            gender: req.body.gender
        }
        user.findOne({ email: req.body.email }, (err, firstResult) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else if (firstResult)
                return commonFile.responseHandler(res, 409, "Email id already registered.")
            else {
                
                var name = (req.body.name).toLowerCase();
                var fullName = ""
                let array = name.split(" ")

                var i = 0

                do {
                    fullName = fullName + array[i].charAt(0).toUpperCase() + array[i].substr(1) + " ";
                    i++;
                } while (i < array.length)

                newUserObj.name = fullName
                newUserObj.status = "ACTIVE"
                new user(newUserObj).save((err, result) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error.")
                    else
                        return commonFile.responseHandler(res, 200, "You have successfully add new user.")
                })
            }
        })

    },





    // @@@@@@@@@@@@@@@@@@@@@@@  getAllUsers Api to show the User List  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    getAllUsers: (req, res) => {

        console.log("getAllUsers req.body====>>>>", req.body)

        let pattern = "\\b[a-z0-9']*" + req.body.search + "[a-z0-9'?]*\\b";
        let re = new RegExp(pattern, 'gi');

        let query = { status: "ACTIVE" }

        if (req.body.search) {
            query.name = re
        }

        if (req.body.bodyType) {
            query.bodyType = req.body.bodyType
        }

        if (req.body.gender) {
            query.gender = req.body.gender
        }


        let options = {

            page: req.body.page || 1,
            limit: req.body.limit || 10,
            lean: true,
            sort: {
                createdAt: -1
            }
        }

        user.paginate(query, options, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Error")
            else {
                return commonFile.responseHandler(res, 200, "success", result)
            }
        })
    },





    // @@@@@@@@@@@@@@@@@@@@@@@  userDetail Api to to Show the Details  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    userDetail: (req, res) => {

        console.log("req.body========>>>>", req.body)

        if (!req.body.userId) {
            return commonFile.responseHandler(res, 400, "Parameter missing.")
        }

        let query = { _id: req.body.userId, status: "ACTIVE" }

        user.findOne(query, (err, result) => {
            if (err) {
                return commonFile.responseHandler(res, 400, "Internal server error")
            }
            else if (!result) {
                return commonFile.responseHandler(res, 400, "Error: No such user exists")
            }
            else {
                return commonFile.responseHandler(res, 200, "success.", result)
            }
        })
    },


    // @@@@@@@@@@@@@@@@@@@@@@@  editUser Api to to Show the Details  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    editUser: (req, res) => {

        if (!req.body.userId) {
            return commonFile.responseHandler(res, 400, "Parameter missing.")
        }

        let updateObj = {}

        if (req.body.name) {
            updateObj.name = req.body.name
        }
        if (req.body.email) {
            updateObj.email = req.body.email
        }
        if (req.body.age) {
            updateObj.age = req.body.age
        }
        if (req.body.gender) {
            updateObj.gender = req.body.gender
        }
        if (req.body.bodyType) {
            updateObj.bodyType = req.body.bodyType
        }
        if (req.body.height) {
            updateObj.height = req.body.height
        }
        if (req.body.weight) {
            updateObj.weight = req.body.weight
        }

        async.waterfall([(callback) => {

            if (req.body.email) {

                user.find({ _id: { $ne: req.body.userId } }, (err, emailResult) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error.")
                    else if (emailResult) {
                        var index = -1
                        index = emailResult.findIndex((x) => x.email === req.body.email)
                        if (index != -1) {
                            return commonFile.responseHandler(res, 200, "Email id already exits.")
                        }
                        else {
                            callback(null, "done")
                        }

                    }
                    else {
                        callback(null, "done")
                    }
                })
            }
            else {
                callback(null, "done")
            }
        }, (next, callback) => {
            user.findOneAndUpdate({ _id: req.body.userId }, updateObj, { new: true }, (err, final) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal Server Error.")
                else if (final) {
                    callback(null, final)
                }
                else {
                    return commonFile.responseHandler(res, 400, "User not found.")
                }
            })

        }], (err, finalResult) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else
                return commonFile.responseHandler(res, 200, "Profile successfully updated.")
        })

    },






    // @@@@@@@@@@@@@@@@@@@@@@@  blockUnblockUser Api to to change The Status Block/Unblock  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    blockUnblockUser: (req, res) => {
        if (!req.body.userId || !req.body.requestType) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing in blockUnblock")
        }
        let updateObj = {}
        if (req.body.requestType.toLowerCase() === 'block') {
            updateObj.status = 'BLOCK'
        }
        if (req.body.requestType.toLowerCase() === 'unblock') {
            updateObj.status = 'UNBLOCK'
        }
        user.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.userId) }, updateObj, { new: true }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Error: blockUnblock API")
            else if (result) {
                if (req.body.requestType.toLowerCase() === 'block') {
                    return commonFile.responseHandler(res, 200, "You have successfully block this User.")
                }
                if (req.body.requestType.toLowerCase() === 'unblock') {
                    return commonFile.responseHandler(res, 200, "You have successfully unblock this User.")
                }

            } else
                return commonFile.responseHandler(res, 409, "No such user exists.")
        })
    },



    // @@@@@@@@@@@@@@@@@@@@@@@  deleteUser Api to to change The Status Delete  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    deleteUser: (req, res) => {
        console.log("deleteUser req.body====>>>", req.body)
        if (!req.body.userId) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing in delete")
        }
        user.findOneAndRemove({ _id: req.body.userId }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error")
            else if (result)
                return commonFile.responseHandler(res, 200, "User deleted successfully.")
            else
                return commonFile.responseHandler(res, 409, "user not found")
        })
    },






    // @@@@@@@@@@@@@@@@@@@@@@@  addNewBrand Api to add product by admin panel   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    addNewBrand: (req, res) => {

        if (!req.body.createdBy || !req.body.brandName || !req.body.brandGender || !req.body.brandType) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        }

        let newUserObj = { createdBy: req.body.createdBy, brandType: req.body.brandType }
        let query = {}

        if (req.body.brandGender.toLowerCase() === 'male') {
            newUserObj.brandGender = 'Male'
            query.brandGender = 'Male'
        }
        if (req.body.brandGender.toLowerCase() === 'female') {
            newUserObj.brandGender = 'Female'
            query.brandGender = 'Female'
        }

        var brandName = (req.body.brandName).toLowerCase();
        var fullName = ""
        let array = brandName.split(" ")

        var i = 0

        do {
            fullName = fullName + array[i].charAt(0).toUpperCase() + array[i].substr(1) + " ";
            i++;
        } while (i < array.length)

        newUserObj.brandName = fullName.trim()

        query.brandName = newUserObj.brandName


        brand.find(query, (err, final) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else if (!final.length) {

                async.waterfall([(callback) => {
                    if (req.body.brandGender.toLowerCase() === 'both') {
                        console.log("both")
                        newUserObj.brandGender = 'Male'
                        new brand(newUserObj).save((err, Male) => {
                            if (err)
                                callback(err)
                            else {
                                newUserObj.brandGender = 'Female'
                                new brand(newUserObj).save((err, Female) => {
                                    if (err)
                                        callback(err)
                                    else {
                                        callback(null, "done")
                                    }

                                })
                            }

                        })
                    } else {
                        callback(null, "done")
                    }

                }, (next, callback) => {
                    if (req.body.brandGender.toLowerCase() === 'male') {
                        console.log("Male")
                        newUserObj.brandGender = 'Male'
                        new brand(newUserObj).save((err, Female) => {
                            if (err)
                                callback(err)
                            else
                                callback(null, "done")
                        })
                    } else {
                        callback(null, "done")
                    }
                }, (next, callback) => {
                    if (req.body.brandGender.toLowerCase() === 'female') {
                        console.log("Female")
                        newUserObj.brandGender = 'Female'
                        new brand(newUserObj).save((err, Female) => {
                            if (err)
                                callback(err)
                            else
                                callback(null, "done")
                        })
                    } else {
                        callback(null, "done")
                    }
                }], (err, finalResult) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error.")
                    if (finalResult)
                        return commonFile.responseHandler(res, 200, "Brand has been successfully added for " + req.body.brandGender.toLowerCase() + " gender")

                })

            }
            else {

                console.log("final length====>>", final.length)
                if (final.length == 2) {
                    return commonFile.responseHandler(res, 409, "Brand already having for both gender")
                }
                else {

                    if (req.body.brandGender.toLowerCase() != 'both') {

                        if (final[0].brandGender == query.brandGender) {
                            return commonFile.responseHandler(res, 409, "Brand already having for " + newUserObj.brandGender.toLowerCase() + " gender")
                        } else {

                            new brand(newUserObj).save((err, result) => {
                                if (err)
                                    return commonFile.responseHandler(res, 400, "Internal Server Error.")(err)
                                else
                                    return commonFile.responseHandler(res, 200, "Brand has been successfully added for " + newUserObj.brandGender.toLowerCase() + " gender")
                            })
                        }
                    }
                    else {
                        if (final[0].brandGender === 'Male') {
                            newUserObj.brandGender = 'Female'
                            new brand(newUserObj).save((err, result) => {
                                if (err)
                                    return commonFile.responseHandler(res, 400, "Internal Server Error.")(err)
                                else
                                    return commonFile.responseHandler(res, 200, "Brand successfully added for both gender")
                            })
                        }
                        if (final[0].brandGender === 'Female') {
                            newUserObj.brandGender = 'Male'
                            new brand(newUserObj).save((err, result) => {
                                if (err)
                                    return commonFile.responseHandler(res, 400, "Internal Server Error.")(err)
                                else
                                    return commonFile.responseHandler(res, 200, "Brand has been successfully added for both gender")
                            })
                        }

                    }




                }

            }

        })



    },




    // @@@@@@@@@@@@@@@@@@@@@@@  brandNameList Api to show the Brand Name List on Brand Management  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    brandNameList: (req, res) => {

        let pattern = "\\b[a-z0-9']*" + req.body.search + "[a-z0-9'?]*\\b";
        re = new RegExp(pattern, 'gi');

        let n1 = req.body.menPage || 1
        let m1 = req.body.menLimit || 10
        let n2 = req.body.womenPage || 1
        let m2 = req.body.womenLimit || 10
        let n3 = req.body.bothPage || 1
        let m3 = req.body.bothLimit || 10

        let query = {}

        if (req.body.search) {
            query.brandName = re
        }

        brand.find(query).sort({ createdAt: -1 }).exec((err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else {

                let menArray = []
                result.map((x) => {
                    if (x.brandGender === 'Male') {
                        menArray.push(x.brandName)
                    }
                })

                let womenArray = []
                result.map((x) => {
                    if (x.brandGender === 'Female') {
                        womenArray.push(x.brandName)
                    }
                })

                let bothArray = []

                for (let i = 0; i < menArray.length; i++) {
                    for (let j = 0; j < womenArray.length; j++) {
                        if (menArray[i] == womenArray[j]) {
                            bothArray.push(menArray[i])
                        }
                    }
                }

                let men = menArray.slice((n1 - 1) * m1, n1 * m1)

                let menList = {

                    men,
                    menPage: n1,
                    menTotal: menArray.length,
                    menLimit: m1,
                    menPages: Math.ceil(menArray.length / m1)


                }

                let women = womenArray.slice((n2 - 1) * m2, n2 * m2)

                let womenList = {

                    women,
                    womenPage: n2,
                    womenTotal: womenArray.length,
                    womenlimit: m2,
                    womenPages: Math.ceil(womenArray.length / m2)


                }

                let both = bothArray.slice((n3 - 1) * m3, n3 * m3)

                let bothList = {

                    both,
                    bothPage: n3,
                    bothTotal: bothArray.length,
                    bothLimit: m3,
                    bothPages: Math.ceil(bothArray.length / m3)


                }


                let finalResult = {
                    menList,
                    womenList,
                    bothList
                }

                return commonFile.responseHandler(res, 200, "success", finalResult)
            }

        })

    },

    // @@@@@@@@@@@@@@@@@@@@@@@  addNewProduct Api to Add The Product on Product Management  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


    addNewProduct: (req, res) => {
        console.log("req.body========>>>>", req.body)
        if (!req.body.createdBy || !req.body.productName || !req.body.brandName || !req.body.productDesc || !req.body.productGender || !req.body.bodyType || !req.body.productDetail.length || !req.body.productLink) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        }


        let newProduct = {
            createdBy: req.body.createdBy,
            brandName: req.body.brandName,
            dressType:req.body.dressType,
            productDesc: req.body.productDesc,
            bodyType: req.body.bodyType,
            productLink: req.body.productLink,
            productDetail:req.body.productDetail
        }



        if (req.body.productGender.toLowerCase() === 'male') {
            newProduct.productGender = 'Male'
        }
        if (req.body.productGender.toLowerCase() === 'female') {
            newProduct.productGender = 'Female'
        }


        var productName = (req.body.productName).toLowerCase();
        var fullName = ""
        let array = productName.split(" ")

        var i = 0

        do {
            fullName = fullName + array[i].charAt(0).toUpperCase() + array[i].substr(1) + " ";
            i++
        } while (i < array.length)

        newProduct.productName = fullName.trim()


        let query = { productName: newProduct.productName, brandName: req.body.brandName, bodyType: req.body.bodyType, dressType:req.body.dressType }

        async.waterfall([(callback) => {

            admin.findById({ _id: req.body.createdBy }, (err, result) => {
                if (err)
                    callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                else if (!result)
                    callback({ resCode: 409, msg: "admin not found." })
                else
                    callback(null, "done")
            })

        }, (next, callback) => {

            product.findOne(query, (err, mixture) => {
                if (err)
                    callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                else
                    callback(null, mixture)
            })

        }, (mixture, callback) => {

            if (mixture && mixture.status == "ACTIVE") {
                callback({ resCode: 409, msg: "You have already added this product." })
            }

            else {

                asyncForEach(req.body.productDetail, function (item, index, next) {
                    console.log("index================>", index)
                    
                    newProduct.productDetail[index].productSize = item.productSize.sort()                    
                    newProduct.productPrice = item.productPrice
                    newProduct.productColor = item.productColor
                    
                    if(item.productImage.length && item.tryOnImage.length){
                        
                        commonFile.uploadMultipleImages(item.productImage, (url) => {
                            if (url != undefined) {
                                newProduct.productDetail[index].productImage = url
                                commonFile.uploadMultipleImages(item.tryOnImage, (url1) => {
                                    if (url1 != undefined) {
                                        newProduct.productDetail[index].tryOnImage = url1
                                        if(index == 0){
                                            newProduct.productImage = url
                                            newProduct.productPrice = item.productPrice
                                        }
                                        next();
                                    }
                                })
                            }
                        })
                    }
                    if(item.productImage.length && !item.tryOnImage.length){
                        
                        commonFile.uploadMultipleImages(item.productImage, (url) => {
                            if (url != undefined) {
                                newProduct.productDetail[index].productImage = url
                                if(index == 0){
                                    newProduct.productImage = url
                                    newProduct.productPrice = item.productPrice
                                }
                                next()
                            }
                        })
                    }
                    if(!item.productImage.length && item.tryOnImage.length){
                        
                        commonFile.uploadMultipleImages(item.tryOnImage, (url) => {
                            if (url != undefined) {
                                newProduct.productDetail[index].tryOnImage = url
                                if(index == 0){
                                    newProduct.productImage = url
                                    newProduct.productPrice = item.productPrice
                                }
                                next()
                            }
                        })
                    }

                }, function (err, result) {
                    if (err)
                        callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                    else
                        callback(null, result)
                });

            }

        }, (next, callback) => {

            new product(newProduct).save((err, success) => {
                if (err)
                    callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                else
                    callback(null, success)
            })

        }], (err, finalResult) => {
            if (err)
                return commonFile.responseHandler(res, err.resCode, err.msg, err.err)
            else
                return commonFile.responseHandler(res, 200, "Product successfully added.")
        })
    },










    // @@@@@@@@@@@@@@@@@@@@@@@  deleteProduct Api to deleteProduct the product   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    deleteProduct: (req, res) => {
        console.log("req.body========>>>>", req.body)

        if (!req.body.productId) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        }

        product.findByIdAndUpdate({ _id: req.body.productId, status: "ACTIVE" }, { status: "DELETED" }, { new: true }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else
                return commonFile.responseHandler(res, 200, "Successfully deleted product.")
        })
    },






    // @@@@@@@@@@@@@@@@@@@@@@@  productDetail Api to show the product Detail   @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


    productDetail: (req, res) => {
        console.log("req.body========>>>>", req.body)
        if (!req.body.productId) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        }

        product.findById({ _id: req.body.productId, status: "ACTIVE" }, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else
                return commonFile.responseHandler(res, 200, "success", result)
        })

    },






    // @@@@@@@@@@@@@@@@@@@@@@@  productList Api to show the product List with Searching and Filtering and sortBy  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    productList: (req, res) => {

        let pattern = "\\b[a-z0-9']*" + req.body.search + "[a-z0-9'?]*\\b";
        re = new RegExp(pattern, 'gi');

        let query = { status: "ACTIVE" }

        if (req.body.search) {
            query.productName = re
        }

        if (req.body.productGender) {
            query.productGender = req.body.productGender
        }
        if (req.body.bodyType) {
            query.bodyType = req.body.bodyType
        }

        let options = {
            page: req.body.page || 1,
            limit: req.body.limit || 10
        }
        product.paginate(query, options, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else
                return commonFile.responseHandler(res, 200, "success.", result)
        })
    },





    // @@@@@@@@@@@@@@@@@@@@@@@  updateProduct Api to update the Product  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


    updateProduct: (req, res) => {

        console.log("tryon image req=====>>>", req.body)
        let query = { _id: req.body.productId }
        let updateImage = {} // for showing new Pic in product 

        let count = 1

        async.waterfall([(callback) => {

            let update = {}

            if (req.body.productDesc) {
                update.productDesc = req.body.productDesc
            }
            if (req.body.productLink) {
                update.productLink = req.body.productLink
            }

            product.findByIdAndUpdate(query, update, { new: true }, (err, result) => {
                if (err)
                    return commonFile.responseHandler(res, 400, "Internal Server Error.")
                else if (result)
                    callback(null, result)
                else
                    callback({ err: err, resCode: 409, msg: "Product id not found." })
            })

        }, (result, callback) => {

            asyncForEach(req.body.productDetail, (item, index, next) => {

                if (item._id) {
                    console.log("item._id======>>>>",item._id)
                    console.log("productDetail.length======>>>>",req.body.productDetail.length)
                    let update = {}

                    if (item.productPrice) {
                        update["productDetail.$.productPrice"] = item.productPrice
                    }

                    if (item.productSize.length) {
                        update.$addToSet = { "productDetail.$.productSize": { $each: item.productSize.sort() } }
                    }

                    if (item.productImage.length && item.tryOnImage.length) {
                        console.log("productImage.length && tryOnImage.length")
                        commonFile.uploadMultipleImages(item.productImage, (url1) => {
                            if (url1 != undefined) {
                                if(index == 0){
                                    updateImage.productImage = url1[0]
                                }
                                update['$addToSet']["productDetail.$.productImage"] = { $each: url1 }
                                commonFile.uploadMultipleImages(item.tryOnImage, (url2) => {
                                    if (url2 != undefined) {
                                        let image = { "productDetail.$.productImage": [], "productDetail.$.tryOnImage": [] }
                                        product.update({ "productDetail._id": item._id }, image, (err, result) => {
                                            console.log("result=====>>>>",err, result)
                                            if (err)
                                                callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                                            else {
                                                update['$addToSet']["productDetail.$.tryOnImage"] = { $each: url2 }

                                                product.update({ "productDetail._id": item._id }, update, (err, result1) => {
                                                    console.log("result1=====>>>>",err, result1)
                                                    if (err)
                                                        callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                                                    else
                                                       next()
                                                })
                                            }
                                        })

                                    }
                                })

                            }
                        })
                    }

                    if (item.productImage.length && !item.tryOnImage.length) {

                        commonFile.uploadMultipleImages(item.productImage, (url) => {
                            if (url != undefined) {
                                if(index == 0){
                                    updateImage.productImage = url[0]
                                }
                                let image = { "productDetail.$.productImage": [] }
                                product.update({ "productDetail._id": mongoose.Types.ObjectId(item._id) }, image, (err, result) => {
                                    console.log("image======>>>", url, result)
                                    if (err)
                                        callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                                    else {

                                        update['$addToSet']["productDetail.$.productImage"] = { $each: url }

                                        product.update({ "productDetail._id": mongoose.Types.ObjectId(item._id) }, update, (err, result) => {
                                            console.log("result===========>>>item", result)
                                            if (err)
                                                callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                                            else
                                                next()
                                        })
                                    }

                                })

                            }
                        })
                    }

                    if (!item.productImage.length && item.tryOnImage.length) {
                        console.log("tryOnImage.length")
                        commonFile.uploadMultipleImages(item.tryOnImage, (url) => {
                            if (url != undefined) {
                                if(index == 0){
                                    updateImage.productImage = url[0]
                                }
                                let image = { "productDetail.$.tryOnImage": [] }

                                product.findByIdAndUpdate({ "productDetail._id": item._id }, image, { new: true }, (err, result) => {
                                    if (err)
                                        callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                                    else {

                                        update['$addToSet']["productDetail.$.tryOnImage"] = { $each: url }
                                        product.findByIdAndUpdate({ "productDetail._id": item._id }, update, { new: true }, (err, result) => {
                                            if (err)
                                                callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                                            else 
                                                next()
                                        })
                                    }

                                })
                            }
                        })
                    }
                    if(!item.productImage.length && !item.tryOnImage.length){
                        product.update({ "productDetail._id": item._id }, update, { new: true }, (err, result) => {
                            if (err)
                                callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                            else
                                next()
                        })
                    }
                }
                else {

                    console.log("product id nhi hai")
                    let newObj = {
                        productColor: item.productColor,
                        productPrice: item.productPrice,
                        productSize: item.productSize.sort(),
                    }

                    commonFile.uploadMultipleImages(item.productImage, (url1) => {
                        if (url1 != undefined) {
                            if(index == 0){
                                updateImage.productImage = url1[0]
                            }
                            newObj.productImage = url1
                            if(!item.tryOnImage || !item.tryOnImage.length){
                                console.log("tryOn Image nhi hai")
                                product.update({ _id: req.body.productId }, { $push: { productDetail: newObj } }, (err, result) => {
                                    console.log("result=======>>>>>bina id wala", result)
                                    if (err)
                                        callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                                    else
                                        next()
                                })
                            }
                            else{

                                console.log("tryOn Image hai")
                                commonFile.uploadMultipleImages(item.tryOnImage, (url2) => {
                                    if (url2 != undefined) {
                                        newObj.tryOnImage = url2
                                        console.log("newObj==========>>>", newObj)
                                        product.update({ _id: req.body.productId }, { $push: { productDetail: newObj } }, (err, result) => {
                                            console.log("result=======>>>>>bina id wala", result)
                                            if (err)
                                                callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                                            else
                                                next()
                                        })
    
                                    }
                                })
                            }

                        }
                    })

                }

            }, function (err, result) {
                    if (err)
                        callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                    else{
                        product.findByIdAndUpdate(query, updateImage, { new:true }, (err, product) => {
                            if (err)
                                callback({ err: err, resCode: 400, msg: "Internal Sever Error." })
                            else
                                callback(null, result)
                        })
                    }
                        
            })

        }], (err, finalResult) => {
            console.log("success")
            if (err)
                return commonFile.responseHandler(res, err.resCode, err.msg, err.err)
            else

                return commonFile.responseHandler(res, 200, "Product successfully updated.")
        })

    },







    // @@@@@@@@@@@@@@@@@@@@@@@  productName Api to show the Product Name List  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    brandNameOnAddProduct: (req, res) => {

        if (!req.body.brandGender) {
            return commonFile.responseHandler(res, 400, "Parameters missing.")
        }
        let query = {}
        if (req.body.brandGender.toLowerCase() === 'male') {
            query.brandGender = 'Male'
        }
        if (req.body.brandGender.toLowerCase() === 'female') {
            query.brandGender = 'Female'
        }

        let masterQuery = [
            {
                $match: query
            },
            {
                $group: { _id: "$brandName" }
            },
            {
                $sort: { _id: 1 }
            }
        ]

        brand.aggregate(masterQuery, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else {
                let show = result.map((x) => x._id)

                return commonFile.responseHandler(res, 200, "success", show)
            }

        })

    },




    // @@@@@@@@@@@@@@@@@@@@@@@  bodyTypeList Api to show (BodyType according to gender) or (Brand List according to bodyType) on Add New Style Page @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


    bodyTypeBrandList: (req, res) => {

        if (!req.body.productGender) {
            return commonFile.responseHandler(res, 400, "Parameters missing.")
        }
        let query = {}
        if (req.body.productGender.toLowerCase() === 'male') {
            query.productGender = 'Male'
        }
        if (req.body.productGender.toLowerCase() === 'female') {
            query.productGender = 'Female'
        }
        if (req.body.bodyType) {
            query.bodyType = req.body.bodyType
        }

        let masterQuery = [
            {
                $match: query
            },
            {
                $group: { _id: "$brandName" }
            }
        ]
        product.aggregate(masterQuery, (err, result) => {
            console.log("result", result)
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else {
                let show = result.map((x) => x._id)

                return commonFile.responseHandler(res, 200, "success", show)
            }

        })
    },



    // @@@@@@@@@@@@@@@@@@@@@@@  addNewStyle Api  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


    addNewStyleTip: (req, res) => {

        if (!req.body.createdBy || !req.body.brandName || !req.body.styleGender || !req.body.bodyType) {
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")
        }

        let newStyle = {
            brandName: req.body.brandName,
            styleGender: req.body.styleGender,
            bodyType: req.body.bodyType,
            createdBy: req.body.createdByList
        }

        let query = { $and: [{ brandName: req.body.brandName }, { bodyType: req.body.bodyType }] }
        style.findOne(query, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else if (result)
                return commonFile.responseHandler(res, 200, "Style tip already having in " + req.body.styleGender.toLowerCase() + " for this brand")
            else {
                new style(newStyle).save((err, success) => {
                    if (err)
                        return commonFile.responseHandler(res, 400, "Internal Server Error.")
                    else
                        return commonFile.responseHandler(res, 200, "The style tip has been successfully added.")

                })
            }
        })
    },




    // @@@@@@@@@@@@@@@@@@@@@@@  bodyTypeList Api to show (BodyType according to gender) or (Brand List according to bodyType) on Style Management Screen  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


    styleBrandList: (req, res) => {

        let query = {}

        if (req.body.styleGender == 'Male') {
            query.styleGender = 'Male'
        }

        if (req.body.styleGender == 'Female') {
            query.styleGender = 'Female'
        }

        if (req.body.bodyType) {
            query.bodyType = req.body.bodyType
        }

        let masterQuery = [
            {
                $match: query
            },
            {
                $group: { _id: "$brandName" }
            }
        ]
        style.aggregate(masterQuery, (err, result) => {
            console.log("result", result)
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else
                return commonFile.responseHandler(res, 200, "Success", result)

        })
    },



    // @@@@@@@@@@@@@@@@@@@@@@@  DashBoard Collections  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    styleTipList: (req, res) => {

        let pattern = "\\b[a-z0-9']*" + req.body.search + "[a-z0-9'?]*\\b";
        re = new RegExp(pattern, 'gi');

        let query = {}

        if (req.body.search) {
            query.brandName = re
        }

        if (req.body.styleGender) {
            query.styleGender = req.body.styleGender
        }

        if (req.body.bodyType) {
            query.bodyType = req.body.bodyType
        }

        if (req.body.brandName) {
            query.brandName = req.body.brandName
        }

        let options = {
            page: req.body.page || 1,
            limit: req.body.limit || 10,
            sort: { createdAt: -1 }
        }

        style.paginate(query, options, (err, result) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            else
                return commonFile.responseHandler(res, 200, "Success.", result)
        })
    },




    // @@@@@@@@@@@@@@@@@@@@@@@  DashBoard Collections  @@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


    totalCollection: (req, res) => {
        console.log("req.headers====>>>", req.headers)

        async.waterfall([(callback) => {
            user.find({ status: "ACTIVE" }, (err, user) => {
                if (err)
                    callback(err)
                else
                    callback(null, user.length)
            })
        }, (user, callback) => {

            let masterQuery = [
                {
                    $group: { _id: "$brandName" }
                }
            ]
            brand.aggregate(masterQuery, (err, brand) => {
                if (err)
                    callback(err)
                else
                    callback(null, { totalUser: user, totalBrand: brand.length })
            })
        }, (both, callback) => {
            product.find({ status: "ACTIVE" }, (err, product) => {
                if (err)
                    callback(err)
                else {
                    both.totalProduct = product.length
                    callback(null, both)
                }
            })
        }
        ], (err, finalResult) => {
            if (err)
                return commonFile.responseHandler(res, 400, "Internal Server Error.")
            if (finalResult)
                return commonFile.responseHandler(res, 200, "Success", finalResult)

        })
    },





    //======================async-await=====================================
    // function doubleAfter2Seconds(x) {
    // return new Promise(resolve => {
    // setTimeout(() => {
    // resolve(x * 2);
    // }, 2000);
    // });
    // }
    // async function addAsync(x) {
    // const a = await doubleAfter2Seconds(10);
    // const b = await doubleAfter2Seconds(20);
    // const c = await doubleAfter2Seconds(30);
    // return x + a + b + c;
    // }
    // addAsync(10).then((sum) => {
    // console.log(sum);
    // });







































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
        if (!req.body.type) {
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
            query = {};
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
            console.log("updateObj", updateObj);
            admin.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, updateObj, {
                new: true,
                projection: {
                    name: 1,
                    accountID: 1,
                    profilePic: 1,
                    location: 1,
                    phoneNumber: 1
                }
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
        if (!req.body.packageName || !req.body.packagePrice || !req.body.packageDesc || !req.body.subscriptionPeriod)
            return commonFile.responseHandler(res, 400, "Error: Parameters missing")

        let pack = new packages({
            packageName: req.body.packageName,
            packagePrice: req.body.packagePrice,
            packageDesc: req.body.packageDesc,
            subscriptionPeriod: (req.body.subscriptionPeriod) * 86400000,
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
                boostName: re,
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
            return commonFile.responseHandler(res, 402, "Token Missing")
        }
        jwt.verify(req.headers.token, config.jwtSecretKey, (err, decoded) => {
            if (err) {
                return commonFile.responseHandler(res, 403, "Token Expired.")
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
                subscriptionPeriod: 1,
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
        console.log("hiihihihihihihihihihihihihihih", req.body)
        if (!req.body.user)
            return commonFile.responseHandler(res, 400, "Parameters missing")
        user.findOne({
            _id: mongoose.Types.ObjectId(req.body.user)
        }, {
                userName: 1,
                accountID: 1,
                status: 1,
                location: 1,
                gender: 1
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

    getBoostDetail: (req, res) => {
        console.log("req.body=======>>>>", req.body)
        let pattern, re, query;
        if (req.body.filterWord) {
            console.log("calling")
            console.log("req.body.filterWord====>", req.body.filterWord)
            pattern = "\\b[a-z0-9']*" + req.body.filterWord + "[a-z0-9'?]*\\b";
            re = new RegExp(pattern, 'gi');
            query = {
                boostName: re
            };
        }
        else {
            query = {};
        }
        let options = {
            page: req.body.page || 1,
            limit: 5,
            createdAt: -1,
            populate: "purchaseBy"

        }
        boostPurchases.paginate(query, options, (err, result) => {
            if (err) {
                console.log("=====....!!!!!!!!!RESULT", err)
                return commonFile.responseHandler(res, 400, "Internal Server Error")
            }
            else if (!result) {

                return commonFile.responseHandler(res, 409, "user not found")
            }
            else {
                console.log("=====....RESULT", result)
                return commonFile.responseHandler(res, 200, "Success", result)
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






}