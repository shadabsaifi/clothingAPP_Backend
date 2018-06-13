const mongoose = require('mongoose');
const commonFile = require('../fileHandler/commonFile.js')
const db = mongoose.connection;


let Admin = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    name: {
        type: String
    },
    profilePic: {
        type: String,
    },
    phoneNumber: {
        type: Number
    },
    location:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})
let AdminModel = mongoose.model('admin', Admin, 'admin');

module.exports = AdminModel

AdminModel.findOne({}, (error, success) => {
    if (error) {
        console.log(error)
    } else {
        if (!success) {
            commonFile.createHash("tapculture", (err, password) => {
                if (err)
                    console.log(err)
                else{
                    new AdminModel({
                        email: "dubeyanuj639@gmail.com",
                        password: password,
                        name: "Anuj",
                        phoneNumber: "8273242159",
                        profilePic: "http://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg"
                    }).save((error, success) => {
                        console.log("Successfully Added Admin")
                    })
                }
            })
        }
    }
})