// import { Schema } from 'mongoose';

const mongoose = require('mongoose');

let notification=mongoose.Schema({
               readCountLike:{
                    type:Number,
                    default:0
               },
               readCountView:{
                type:Number,
                default:0
           },
              likeUserList:{
            user: { type: mongoose.Schema.Types.ObjectId},
            _id:false
           },
             viewUserList:{
            user: { type: mongoose.Schema.Types.ObjectId},
            _id:false
          }

})