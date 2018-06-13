const mongoose=require('mongoose')
const mongoosePaginate=require('mongoose-paginate')
let Schema=mongoose.Schema;

let transactionSchema= new Schema({
	
	packageName:{
		type:String
	},
	transactionId:{
		type:String
	},
	packageBought:{
		type:mongoose.Schema.Types.ObjectId, ref:'package'
	},
	amount:{
		type:Number
	},
	coinsQty:{
		type:Number
	},
	createdAt:{
		type:Date,
		default:Date.now
	},
	purchaseBy:{
		type:mongoose.Schema.Types.ObjectId, ref:'user'
	},
	days:{
		type:Number
	}
})

transactionSchema.plugin(mongoosePaginate)
module.exports=mongoose.model('transactions',transactionSchema,'transactions')