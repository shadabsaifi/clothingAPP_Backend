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
		type: Number
	},
	productDesc: {
		type: String
	},
	productLink:{
		type:String
	},
	productGender:{
		type:String,
		enum:['Male', 'Female', 'Both']
	},
	bodyType:{
		type:String
	},
	productColor: {
		type: Array,
		default: ["BLACK", "WHITE", "YELLOW", "GREEN", "GREY", "RED"]
	},
	productDetail: [{ productImage:{ type:Array }, productColor:{ type:String }, productSize:{ type:Array }, productPrice:{ type:Number } } ],

	productSize: {
		type: Array,
		default: ["S", "M", "L", "XL", "XXL", "XXXL"]
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



