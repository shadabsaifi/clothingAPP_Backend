const mongoose=require('mongoose')
const mongoosePaginate=require('mongoose-paginate')
let Schema=mongoose.Schema;

let premiumAccount= new Schema({
	// transactionId:{
	// 	type:String
	// },
	// packageBought:{
	// 	type:mongoose.Schema.Types.ObjectId, ref:'package'
	// },
	// amount:{
	// 	type:Number
	// },
	amount:{
		type:String
    },
    timePeriod:{
		type:Number
		},
		// unit:{
		// 	type:String
		// },
    description:{
      type:String  
    },
	createdAt:{
		type:Date,
		default:Date.now
	},
	status:{
		type:String,
		default:"ACTIVE"
	}
	// madeBy:{
	// 	type:mongoose.Schema.Types.ObjectId, ref:'user'
	// },
	
})

premiumAccount.plugin(mongoosePaginate)
module.exports=mongoose.model('premiumAccount',premiumAccount,'premiumAccount')