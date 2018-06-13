const mongoose=require('mongoose')
const mongoosePaginate=require('mongoose-paginate')
let Schema=mongoose.Schema;

let transactionSchema= new Schema({
	
	productName:{
		type:String
	},
	transactionId:{
		type:String
	},
	productBought:{
		type:mongoose.Schema.Types.ObjectId, ref:'product'
	},
	amount:{
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
module.exports=mongoose.model('transaction',transactionSchema,'transaction')