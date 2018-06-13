const mongoose=require('mongoose')
const mongoosePaginate=require('mongoose-paginate')
let Schema=mongoose.Schema;

let packageSchema=new Schema({
	packageName:{
		type:String,
	},
	packageType:{
		type:String
	},
	packagePrice:{
		type:String
	},
	packageDesc:{
		type:String
	},
	packageImage:{
		type:String
	},
	subscriptionPeriod:{
		type:Number
	},
	// coinsQty:{
	// 	type:Number
	// },
	coins:{
		type:Number
	},
	// purchasedBy:[{
	// 	user:{
	// 		type:mongoose.Schema.Types.ObjectId, ref:'user'
	// 	},
	// 	createdAt:{
	// 		type:Date,
	// 		default:Date.now
	// 	}
	// }],
	createdAt:{
		type:Date,
		default:Date.now
	},
	createdBy:{
		type:mongoose.Schema.Types.ObjectId,ref:'admin'
	},
	status:{
		type:String,
		default:"ACTIVE"
	}
})

packageSchema.plugin(mongoosePaginate)
module.exports=mongoose.model('package',packageSchema,'package')



