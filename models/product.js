const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
let Schema = mongoose.Schema;

let productSchema = new Schema({

	productName: {
		type: String,
		trim:true
	},
	brandName: {
		type: String
	},
	productDesc: {
		type: String
	},
	productGender:{
		type:String,
		enum:['Male', 'Female']
	},
	bodyType:{
		type:String
	},
	productDetail: [{ productImage:[], tryOnImage:[], productColor:{ type:String }, productSize:[], productPrice:{ type:Number } } ],
	
	productLink:{
		type:String
	},
	status:{
		type:String,
		enum:["ACTIVE","DELETED"],
		default:"ACTIVE"
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId, ref: 'admin'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},

	// old key 
	productImage:{
		type:Array
	},
	productPrice:{ 
		type:Number 
	}

})

productSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('product', productSchema, 'product')