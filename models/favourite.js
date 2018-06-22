const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate')
const db = mongoose.connection;


let favourite = mongoose.Schema({

    productId:{
        type:mongoose.Schema.Types.ObjectId, ref:'product'
    },
    likedBy:{
        type:mongoose.Schema.Types.ObjectId, ref:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

favourite.plugin(mongoosePaginate)
module.exports=mongoose.model('favourite',favourite,'favourite')
