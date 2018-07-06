let adminRoutes=require('express').Router()
let adminHandler=require('../fileHandler/adminHandler.js')



// admin api start for clothing app
adminRoutes.post('/login',adminHandler.login)
adminRoutes.post('/forgotPassword',adminHandler.forgotPassword)
adminRoutes.post('/resetPassword',adminHandler.resetPassword)

adminRoutes.get('/adminDetail',adminHandler.verifyToken,adminHandler.adminDetail)
adminRoutes.post('/getAllUsers',adminHandler.verifyToken,adminHandler.getAllUsers)
adminRoutes.post('/addNewBrand',adminHandler.verifyToken,adminHandler.addNewBrand)
adminRoutes.post('/brandNameList',adminHandler.verifyToken,adminHandler.brandNameList)
adminRoutes.post('/addNewProduct',adminHandler.addNewProduct)
adminRoutes.post('/deleteProduct',adminHandler.verifyToken,adminHandler.deleteProduct)
adminRoutes.post('/productDetail',adminHandler.verifyToken,adminHandler.productDetail)
adminRoutes.post('/productList',adminHandler.verifyToken,adminHandler.productList)
adminRoutes.get('/productNameList',adminHandler.verifyToken,adminHandler.productNameList)
adminRoutes.post('/updateProduct',adminHandler.verifyToken,adminHandler.updateProduct)
adminRoutes.post('/userDetail',adminHandler.verifyToken,adminHandler.userDetail)
adminRoutes.post('/deleteUser',adminHandler.verifyToken,adminHandler.deleteUser)
adminRoutes.post('/bodyTypeBrandList',adminHandler.verifyToken,adminHandler.bodyTypeBrandList)
adminRoutes.post('/addNewStyleTip',adminHandler.verifyToken,adminHandler.addNewStyleTip)
adminRoutes.post('/styleBrandList',adminHandler.verifyToken,adminHandler.styleBrandList)
adminRoutes.post('/styleTipList',adminHandler.verifyToken,adminHandler.styleTipList)
adminRoutes.get('/totalCollection',adminHandler.verifyToken,adminHandler.totalCollection)

// admin api end for clothing app


















// ankit sir ne htwa diya hai
adminRoutes.post('/addNewUser',adminHandler.verifyToken,adminHandler.addNewUser)
adminRoutes.post('/editUser',adminHandler.verifyToken,adminHandler.editUser)



adminRoutes.get('/activeUsers',adminHandler.verifyToken,adminHandler.activeUsers)
adminRoutes.get('/getStaticContent',adminHandler.getStaticContent)
adminRoutes.post('/tempCld',adminHandler.verifyToken,adminHandler.uploadMultipleImagesCld)
adminRoutes.post('/addNewPackage',adminHandler.addNewPackage)
adminRoutes.post('/blockUnblockUser',adminHandler.blockUnblockUser)
adminRoutes.post('/updateStaticContent',adminHandler.verifyToken,adminHandler.updateStaticContent)
adminRoutes.post('/deleteStaticContent',adminHandler.verifyToken,adminHandler.deleteStaticContent)
adminRoutes.post('/searchFromUserMgmt',adminHandler.verifyToken,adminHandler.searchFromUserMgmt)














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