const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
let Schema = mongoose.Schema;

let productSchema = new Schema({

	productName: {
		type: String,
		trim:true
	},
	productType: {
		type: String
	},
	productPrice: {
		type: String
	},
	productDesc: {
		type: String
	},
	productImage: {
		type: Array
	},
	bodyType:{
		type:String
	},
	productSize: {
		type: Array,
		default: ["S", "M", "L", "XL", "XXL", "XXXL"]
	},
	productColor: {
		type: Array,
		default: ["BLACK", "WHITE", "YELLOW", "GREEN", "GREY", "RED"]
	},
	productLink:{
		type:String
	},
	subscriptionPeriod: {
		type: Number
	},
	status: {
		type: String,
		enum: ["ACTIVE", "DELETE"],
		default: "ACTIVE"
	},
	stock: {
		type: String,
		enum: ["In Stock", "Out Of Stock"],
		default: "In Stock"
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId, ref: 'admin'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}

})

productSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('product', productSchema, 'product')



