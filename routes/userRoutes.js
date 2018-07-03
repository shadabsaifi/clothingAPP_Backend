const userRoutes = require('express').Router();
const mongoose = require('mongoose');
const userHandler = require('../fileHandler/userHandler.js')
const commonFile = require('../fileHandler/commonFile.js')



// clothing App API start 

userRoutes.post('/verifyToken',userHandler.verifyToken)
userRoutes.post('/checkSubscription',userHandler.checkSubscription)
userRoutes.post('/login',userHandler.login)
userRoutes.post('/signup',userHandler.signup)
userRoutes.post('/forgotPassword',userHandler.forgotPassword)
userRoutes.post('/verifyOTP',userHandler.verifyOTP)
userRoutes.post('/changePassword',userHandler.changePassword)
userRoutes.post('/completeProfileSetup',userHandler.verifyToken,userHandler.completeProfileSetup)
userRoutes.post('/paymentGetway',userHandler.paymentGetway)
userRoutes.post('/userDetail',userHandler.verifyToken,userHandler.userDetail)
userRoutes.post('/updateUserDetail',userHandler.verifyToken,userHandler.updateUserDetail)
userRoutes.post('/likeUnlikeProduct',userHandler.verifyToken,userHandler.likeUnlikeProduct)
userRoutes.post('/myFavourite',userHandler.verifyToken,userHandler.myFavourite)
userRoutes.get('/logout',userHandler.verifyToken,userHandler.logout)
userRoutes.post('/searchsuggestion',userHandler.verifyToken,userHandler.searchsuggestion)
userRoutes.post('/productList',userHandler.checkSubscription,userHandler.productList)
userRoutes.post('/brandNameList',userHandler.verifyToken,userHandler.checkSubscription,userHandler.brandNameList)
userRoutes.post('/productDetail',userHandler.verifyToken,userHandler.productDetail)
userRoutes.post('/styleBrandList',userHandler.verifyToken,userHandler.checkSubscription,userHandler.styleBrandList)
userRoutes.post('/styleTipList',userHandler.checkSubscription,userHandler.styleTipList)
userRoutes.post('/favouriteBrandList',userHandler.verifyToken,userHandler.favouriteBrandList)


// clothing App API end 








userRoutes.post('/addSocialAccounts',userHandler.verifyToken,userHandler.addSocialAccounts)
userRoutes.post('/profileSetup',userHandler.verifyToken,userHandler.profileSetup)
userRoutes.get('/fetchUserDetails',userHandler.verifyToken,userHandler.fetchUserDetails)
userRoutes.get('/shopList',userHandler.verifyToken,userHandler.shopList)
userRoutes.get('/showSubscriptionList',userHandler.verifyToken,userHandler.showSubscriptionList)
userRoutes.post('/getUsers',userHandler.verifyToken,userHandler.getUsers)
userRoutes.post('/login',userHandler.login)
userRoutes.post('/nearByUsers',userHandler.verifyToken,userHandler.nearByUsers)
userRoutes.post('/sendFeedback',userHandler.verifyToken,userHandler.sendFeedback)
userRoutes.post('/updateUserProfile',userHandler.verifyToken,userHandler.updateUserProfile)
userRoutes.post('/getPopularUsers',userHandler.verifyToken,userHandler.getPopularUsers)
userRoutes.post('/likeUnlikeUser',userHandler.verifyToken,userHandler.likeUnlikeUser)
userRoutes.post('/viewUser',userHandler.verifyToken,userHandler.viewUser)
userRoutes.post('/blockUnblockUser',userHandler.verifyToken,userHandler.blockUnblockUser)
userRoutes.post('/buyPackage',userHandler.verifyToken,userHandler.buyPackage)
userRoutes.post('/logOut',userHandler.verifyToken,userHandler.logOut)
userRoutes.post('/deactivateUser',userHandler.verifyToken,userHandler.deactivateUser)
userRoutes.post('/uploadImage',userHandler.verifyToken,userHandler.uploadImage)
userRoutes.post('/loginWithFacebook',userHandler.loginWithFacebook)
userRoutes.post('/boostMeDetailFetch',userHandler.verifyToken,userHandler.boostMeDetailFetch)
userRoutes.post('/boostMe',userHandler.verifyToken,userHandler.boostMe)
userRoutes.post('/viewedMe',userHandler.verifyToken,userHandler.viewedMe)
userRoutes.post('/myLikes',userHandler.verifyToken,userHandler.myLikes)
userRoutes.post('/likedMe',userHandler.verifyToken,userHandler.likedMe)
userRoutes.post('/checkDailyRewards',userHandler.verifyToken,userHandler.checkDailyRewards)
userRoutes.post('/takeDailyRewards',userHandler.verifyToken,userHandler.takeDailyRewards)
userRoutes.post('/freeBoost',userHandler.verifyToken,userHandler.freeBoost)
userRoutes.post('/searchByTags',userHandler.verifyToken,userHandler.searchByTags)
userRoutes.post('/hotTagList',userHandler.verifyToken,userHandler.hotTagList)
userRoutes.post('/addSubscription',userHandler.verifyToken,userHandler.addSubscription)
userRoutes.post('/upgradeSubscription',userHandler.verifyToken,userHandler.upgradeSubscription)
userRoutes.post('/tagApi',userHandler.verifyToken,userHandler.tagApi)
userRoutes.post('/unlockedUser',userHandler.verifyToken,userHandler.unlockedUser)
userRoutes.post('/reportUser',userHandler.verifyToken,userHandler.reportUser)
userRoutes.post('/connectWithfacebook',userHandler.verifyToken,userHandler.connectWithfacebook)
userRoutes.post('/blockUserList',userHandler.verifyToken,userHandler.blockUserList)
userRoutes.post('/coinsPurchase',userHandler.verifyToken,userHandler.coinsPurchase)
userRoutes.post('/updateDeviceToken',userHandler.verifyToken,userHandler.updateDeviceToken)
userRoutes.post('/inviteFriendsUrl',userHandler.verifyToken,userHandler.inviteFriendsUrl)
userRoutes.post('/invitationCoin',userHandler.verifyToken,userHandler.invitationCoin)
userRoutes.post('/testing',userHandler.testing)




module.exports = userRoutes;

