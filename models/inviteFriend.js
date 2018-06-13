const mongoose = require('mongoose');

let inviteFriend = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'user' 
    },
    sms: {
        type: String
    },
    fb: {
        type: String
    },
    mail: {
        type: String
    },


});

 inviteFriend = mongoose.model('inviteFriend', inviteFriend, 'inviteFriend');
module.exports = inviteFriend;