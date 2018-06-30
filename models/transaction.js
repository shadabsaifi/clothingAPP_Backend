const mongoose=require('mongoose')
const mongoosePaginate=require('mongoose-paginate')
let Schema=mongoose.Schema;

let transactionSchema= new Schema({
	
	
	purchaseBy:{
		type:mongoose.Schema.Types.ObjectId, ref:'user'
	},
	packegPrice:{
		type:String
	},
	transactionId:{
		type:String
	},
	purchaseDate:{
		type:Date,
		default:Date.now
	},
	createdAt:{
		type:Date,
		default:Date.now
	},
	days:{
		type:Number
	}
})

transactionSchema.plugin(mongoosePaginate)
module.exports=mongoose.model('transaction',transactionSchema,'transaction')