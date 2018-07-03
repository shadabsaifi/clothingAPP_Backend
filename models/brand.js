const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
let Schema = mongoose.Schema;

let brandSchema = new Schema({

	brandName: {
		type: String,
		trim:true
    },
    brandGender:{
        type:String,
		enum:['Male', 'Female']
	},
	brandType: {
		type: String
    },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId, ref: 'admin'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}

})

brandSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('brand', brandSchema, 'brand')



