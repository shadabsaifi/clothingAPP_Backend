const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate')
const db = mongoose.connection;


let style = mongoose.Schema({

    brandName: {
		type: String
    },
    styleGender:{
        type:String,
		enum:['Male', 'Female']
    },
    bodyType:{
        type:String
    },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId, ref: 'admin'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
   

})

style.plugin(mongoosePaginate)
module.exports=mongoose.model('style',style,'style')
