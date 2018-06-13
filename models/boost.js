const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate')
const db = mongoose.connection;


let boost = mongoose.Schema({

   
    boostName:{
        type:String
    },
    boostImage:{
        type:String
    },
    boostType:{
        type: String,
        default: 'Default'
    },
    boostDesc:{
        type:String
    },
    boostQty:{
        type: String,
    },
    boostValueInCoins:{
        type: String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, ref:'admin'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

    boostDiscount:{
        type:String
    },
    status:{
		type:String,
		default:"ACTIVE"
	}
   

})

boost.plugin(mongoosePaginate)
module.exports=mongoose.model('boosts',boost,'boosts')
