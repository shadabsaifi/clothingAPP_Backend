var apn = require("apn"),
    options, connection, notification;

var options = {
    "cert": "pushCert.pem",
    "key": "pushCert.pem",
    
    "passphrase": "Mobiloitte1", //Acropole
    "gateway": "gateway.push.apple.com",//for staging time
    // "gateway": "gateway.sandbox.push.apple.com",//for testing time
    "port": 2195,
    "enhanced": true,
    "cacheLength": 5
};

module.exports = {

    "iosPush": function (token, data) {
        console.log("in notification==============")
        console.log("token==============", token)
        console.log("data==============", data)
        // console.log("data type", data.type);

        var deviceToken = token;
        console.log("deviceToken", deviceToken)
        var apnConnection = new apn.Connection(options);
        var myDevice = new apn.Device(deviceToken);
        var note = new apn.Notification();
        note.expiry = Math.floor(Date.now() / 1000) + (3600*24); // Expires 1 day from now.
        note.badge = 1;
        note.sound = "ping.aiff";
        if (data.type == "like/view") {
            note.alert = data.userName + " you have " + data.countLike + " new likes and " + data.countView + " new views.";
            note.dataType = "like/view"
            note.payload = {
               
                "userName": data.userName,
                "msg": data.msg,
                "type": data.type,
                "countLike": data.countLike,
                "countView": data.countView
            }
            try {
                apnConnection.pushNotification(note, myDevice); //devicIos
                apnConnection.on('transmitted', function (notification, deviceToken) {
                    console.log("=========+++>alert", note.alert)
                    console.log('APNS: Successfully transmitted message' + JSON.stringify(notification));
                });

            } catch (ex) {
                console.log("in Error");
                console.log(ex);
            }
        }

        if (data.type == "like") {
            note.alert = data.userName + " you have " + data.countLike + " new likes.";
            note.dataType = "like"
            note.payload = {
                "userName": data.userName,
                "msg": data.msg,
                "type": data.type,
                "countLike": data.countLike,
                
            }
            try {
                apnConnection.pushNotification(note, myDevice); //devicIos
                apnConnection.on('transmitted', function (notification, deviceToken) {
                    console.log("=========+++>alert", note.alert)
                    console.log('APNS: Successfully transmitted message' + JSON.stringify(notification));
                });

            } catch (ex) {
                console.log("in Error");
                console.log(ex);
            }
        }
        if (data.type == "view") {
            note.alert = data.userName + " you have "+ data.countView+ " new views.";
            note.dataType = "view"
            note.payload = {
                "userName": data.userName,
                "msg": data.msg,
                "type": data.type,
                "countView": data.countView
            }
            try {
                apnConnection.pushNotification(note, myDevice); //devicIos
                apnConnection.on('transmitted', function (notification, deviceToken) {
                    console.log("=========+++>alert", note.alert)
                    console.log('APNS: Successfully transmitted message' + JSON.stringify(notification));
                });

            } catch (ex) {
                console.log("in Error");
                console.log(ex);
            }
        }
        if (data.type == "dailyRewards") {
            note.alert = data.userName + " check-in to collect your daily rewards.";
           
            note.dataType = "dailyRewards"
            note.payload = {
                "userName": data.userName,
                "msg": data.msg,
                "type": data.type,
                "referralCode": data.referralCode,
                "title":data.title
               
            }
            try {
                apnConnection.pushNotification(note, myDevice); //devicIos
                apnConnection.on('transmitted', function (notification, deviceToken) {

                    console.log("=========+++>alert", note.alert)
                    console.log('APNS: Successfully transmitted message' + JSON.stringify(notification));
                });

            } catch (ex) {
                console.log("in Error");
                console.log(ex);
            }

        }
        if (data.type == "upgardePremium") {
            note.alert = data.userName + " Upgarde to premium account to get more features.";
            note.dataType = "upgardePremium"
            note.payload = {
                "userName": data.userName,
                "msg": data.msg,
                "type": data.type,
            }
            try {
                apnConnection.pushNotification(note, myDevice); //devicIos
                apnConnection.on('transmitted', function (notification, deviceToken) {

                    console.log("=========+++>alert", note.alert)
                    console.log('APNS: Successfully transmitted message' + JSON.stringify(notification));
                });

            } catch (ex) {
                console.log("in Error");
                console.log(ex);
            }

        }
    }
}