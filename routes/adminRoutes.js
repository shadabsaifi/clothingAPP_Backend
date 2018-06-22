let adminRoutes=require('express').Router()
let adminHandler=require('../fileHandler/adminHandler.js')

adminRoutes.post('/login',adminHandler.login);
adminRoutes.post('/forgotPassword',adminHandler.forgotPassword)
adminRoutes.post('/resetPassword',adminHandler.resetPassword)
adminRoutes.get('/adminDetail',adminHandler.adminDetail)
adminRoutes.get('/activeUsers',adminHandler.verifyToken,adminHandler.activeUsers)
adminRoutes.get('/getStaticContent',adminHandler.getStaticContent)

adminRoutes.post('/tempCld',adminHandler.verifyToken,adminHandler.uploadMultipleImagesCld)
adminRoutes.post('/addNewPackage',adminHandler.addNewPackage)
adminRoutes.post('/blockUnblockUser',adminHandler.blockUnblockUser)
adminRoutes.post('/deleteUser',adminHandler.deleteUser)
adminRoutes.post('/updateStaticContent',adminHandler.verifyToken,adminHandler.updateStaticContent)
adminRoutes.post('/deleteStaticContent',adminHandler.verifyToken,adminHandler.deleteStaticContent)
adminRoutes.post('/searchFromUserMgmt',adminHandler.verifyToken,adminHandler.searchFromUserMgmt)

// admin api start for clothing app
adminRoutes.post('/getAllUsers',adminHandler.getAllUsers)
adminRoutes.post('/addNewBrand',adminHandler.addNewBrand)
adminRoutes.post('/brandNameList',adminHandler.brandNameList)
adminRoutes.post('/addNewProduct',adminHandler.addNewProduct)
adminRoutes.post('/deleteProduct',adminHandler.deleteProduct)
adminRoutes.post('/productDetail',adminHandler.productDetail)
adminRoutes.post('/productList',adminHandler.productList)
adminRoutes.get('/productNameList',adminHandler.productNameList)
adminRoutes.post('/updateProduct',adminHandler.updateProduct)
adminRoutes.post('/addNewUser',adminHandler.addNewUser)
adminRoutes.post('/userDetail',adminHandler.userDetail)
adminRoutes.post('/editUser',adminHandler.editUser)
adminRoutes.post('/addNewStyle',adminHandler.addNewStyle)
adminRoutes.get('/totalCollection',adminHandler.totalCollection)

// admin api end for clothing app


adminRoutes.post('/deletePackage',adminHandler.verifyToken,adminHandler.deletePackage)
adminRoutes.post('/viewUserFromView',adminHandler.verifyToken,adminHandler.viewUserFromView)
adminRoutes.post('/saveTransactions',adminHandler.verifyToken,adminHandler.saveTransactions)
adminRoutes.post('/getAllTransactions',adminHandler.verifyToken,adminHandler.getAllTransactions)
adminRoutes.post('/deleteUserFromView',adminHandler.verifyToken,adminHandler.deleteUserFromView)
adminRoutes.post('/getDetailsOfUser',adminHandler.verifyToken,adminHandler.getDetailsOfUser)

adminRoutes.post('/getAllPackages',adminHandler.verifyToken,adminHandler.getAllPackages)
adminRoutes.post('/updateAdmin',adminHandler.verifyToken,adminHandler.updateAdmin)
adminRoutes.post('/tempRoute',adminHandler.verifyToken,adminHandler.tempRoute)
adminRoutes.post('/addNewBoost',adminHandler.addNewBoost)
adminRoutes.post('/deactivatedUser',adminHandler.deactivatedUser)
adminRoutes.post('/showBoostList',adminHandler.showBoostList)
adminRoutes.post('/deleteBoost',adminHandler.deleteBoost)
adminRoutes.post('/getBoostDetail',adminHandler.getBoostDetail)

module.exports=adminRoutes;