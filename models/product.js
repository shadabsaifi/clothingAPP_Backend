const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
let Schema = mongoose.Schema;

let productSchema = new Schema({

	productName: {
		type: String,
		trim:true
	},
	brandName: {
		type: String,
		trim:true
	},
	productPrice: {
		type: String
	},
	productDesc: {
		type: String
	},
	productLink:{
		type:String
	},
	productBodyType:{
		type:String
	},
	productColor: {
		type: Array,
		default: ["BLACK", "WHITE", "YELLOW", "GREEN", "GREY", "RED"]
	},
	productSize: {
		type: Array,
		default: ["S", "M", "L", "XL", "XXL", "XXXL"]
	},
	productQuantity: {
		type: Number
	},
	productGender:{
		type:String,
		enum:['Male', 'Female', 'Both']
	},
	productBodyType:{
		type:String
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId, ref: 'admin'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
	
	
	// productType: {
	// 	type: String
	// },
	// productImage: {
	// 	type: Array
	// },
	// subscriptionPeriod: {
	// 	type: Number
	// },
	// status: {
	// 	type: String,
	// 	enum: ["ACTIVE", "DELETED"],
	// 	default: "ACTIVE"
	// },
	// stock: {
	// 	type: String,
	// 	enum: ["In Stock", "Out Of Stock"],
	// 	default: "In Stock"
	// },
	

})

productSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('product', productSchema, 'product')



