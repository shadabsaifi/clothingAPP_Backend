const mongoose=require('mongoose')
const mongoosePaginate=require('mongoose-paginate')
let Schema=mongoose.Schema;

let transactionSchema = new Schema({
	
	
	userId:{
		type:mongoose.Schema.Types.ObjectId, ref:'user'
	},
	userEmail:{
		type:String
	},
	packegPrice:{
		type:Number
	},
	stripeId:{
        type:String
    },
    subscriptionsId:{
        type:String
	},
	status:{
		type:String,
		enum:["ACTIVE","CANCEL"],
		default:"ACTIVE"
	},
	purchaseDate:{
		type:Date,
		default:Date.now
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
})

transactionSchema.plugin(mongoosePaginate)
module.exports=mongoose.model('transaction',transactionSchema,'transaction')