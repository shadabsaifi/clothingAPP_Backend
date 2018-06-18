const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
var shortid = require('shortid');
const db = mongoose.connection;
let User = mongoose.Schema({

    name:{
        type:String,
        trim:true
    },
    age: {
        type:Number
    },
    userName: {
        type: String,
        trim: true
    },
    email:{
        type:String,
        trim: true
    },
    password:{
        type:String
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    selfie: {
        type: String,
        default:""
    },
    height:{
        type:Number
    },
    weight:{
        type:Number
    },
    bodyType:{
        type:String
    },
    productImage: { 
        type: Array 
    },
    myFavourite: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        _id: false
    }],
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "BLOCK", "UNBLOCK", "DELETED"],
        default: "INACTIVE"
    },
    deviceType: {
        type: String
    },
    deviceToken: {
        type: String
    },
    otp:{
        type:String
    },
    isSubscription:{
        type:Boolean,
        default:false
    },
    subscriptionPeriod: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

User.index({ location: "2dsphere" })
User.plugin(mongoosePaginate)
User.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('user', User, 'user');