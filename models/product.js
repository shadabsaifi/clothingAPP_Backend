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
		enum:['Male', 'Female', 'Both']
	},
	bodyType:{
		type:String
	},
	productDetail: [{ productImage:{ type:Array }, productColor:{ type:String }, productSize:{ type:Array }, productPrice:{ type:Number } } ],
	
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
	// productPrice: {
	// 	type: Number
	// },
	// productSize: {
	// 	type: Array,
	// 	default: ["S", "M", "L", "XL", "XXL", "XXXL"]
	// },
	// productColor: {
	// 	type: Array,
	// 	default: ["BLACK", "WHITE", "YELLOW", "GREEN", "GREY", "RED"]
	// },

})

productSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('product', productSchema, 'product')



