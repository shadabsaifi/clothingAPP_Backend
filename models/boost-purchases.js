const mongoose=require('mongoose')
const mongoosePaginate=require('mongoose-paginate')
let Schema=mongoose.Schema;

let boostPurchaseSchema= new Schema({
	boostName:{
		type:String
	},
	boostBought:{
		type:mongoose.Schema.Types.ObjectId, ref:'boosts'
	},
	boostQty:{
		type:String
	},
	coinsPaid:{
		type:String
	},
	createdAt:{
		type:Date,
		default:Date.now
	},
	purchaseBy:{
		type:mongoose.Schema.Types.ObjectId, ref:'user'
	}
})

boostPurchaseSchema.plugin(mongoosePaginate)
module.exports=mongoose.model('boostPurchases',boostPurchaseSchema,'boostPurchases')