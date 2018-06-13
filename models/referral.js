const mongoose=require('mongoose')
const mongoosePaginate=require('mongoose-paginate')
let Schema=mongoose.Schema;

let referralSchema=new Schema({

	referredTo:{
		type:mongoose.Schema.Types.ObjectId ,ref: 'user'
	},
	referredBy:{
		type:mongoose.Schema.Types.ObjectId ,ref: 'user'
	},
	referralCodeUsed:{
		type:String
	},
	createdAt:{
		type:Date,
		default:Date.now()
	}

})

referralSchema.plugin(mongoosePaginate)
module.exports=mongoose.model('referrals',referralSchema,'referrals')