var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var CounterSchema = mongoose.Schema({
    type: {type: String},
    sequence_value: { type: Number },
    refference_value:{type:Number},
    userNo:{type:Number}
});
var counter = mongoose.model('counter', CounterSchema);


module.exports = counter;
var autocall = function(){
  counter.findOne({},(err, result) =>{
  	if(err)console.log("error")
  		else if(!result){
  		var counters = new counter({
  			type:"getUnique",
       sequence_value:1000,
       benefition_value:2000,
       booking_value:2000
  		}).save((err,results)=>{
  			console.log(results)
  		});
  }else{
  }
  })
}
autocall();
