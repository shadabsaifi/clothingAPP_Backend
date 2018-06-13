const config = require('../config/config-dev');
const User= require('../models/User')
const jwt = require('jsonwebtoken')
const crypto=require('crypto')
var apn = require("apn"), options, connection, notification;
var FCM = require('fcm').FCM;

// var serverKey = 'AAAAuHfb6Qw:APA91bEzZskJAM1a3sG5Tp7SKbQ-rjgeoVDJDDhQqk6FRuN_ROT-rv1nIlnEW3nbY72XRLnrc4iKs5vaDwlvNlPu1u6yeEal2lHYJrLqX8FtyYVhvsXgtpsI0JbIPT-Iy8HIA_96MemO';
// var fcm = new FCM(serverKey);

var options = {
   "cert": "MobiloitteEnterpriseDistribution.pem",
   "key": "MobiloitteEnterpriseDistribution.pem",
   "passphrase": "Mobiloitte1",
   "gateway": "gateway.push.apple.com",
   "port": 2195,
   "enhanced": true,
   "cacheLength": 5
};
  ////--------------------------------------------P
  var generatingotp = function(){ 
    var signupotp = "";
    var randomNumbers ='HJDGHDGDGHKADASDJOPEJKDS3845734034832462374344';
    for(var i=0;i<7;i++){
      signupotp+=randomNumbers.charAt(Math.floor(Math.random()*randomNumbers.length));
    }
    return signupotp;
  }

  var userNo = function(password,signupotp,callback){
      var i18n = require('i18n-nodejs')("en", serverObtain.envConstants().i18n.langFile);
    counter.findOneAndUpdate({type : "getUnique",}, {$inc: { userNo: 1} },function(error, counter){
       if(error){return res.json({responseCode:500,responseMessage:i18n.__(errInternal)})}else if(counter){
         callback(null,password,signupotp,counter)
       }else{return res.json({responseCode:400,responseMessage:i18n.__(errUnexpected)})
       }
     })
  }
  var referralCodeUse  = function(code,coins,refferType,id){
    console.log("code",code)
    var code = code;
    var id = id;
    var coins = coins;
    var refferType = refferType;
    console.log("id",id)
    User.findOneAndUpdate({referralCode:code},{$push:{referralUsedBy:id},$inc:{coins:coins},$set:{refferType:refferType}},function(err,data){
      console.log("dataat",data)
      if(err){return console.log(' Wrong error')}else if(!data){return console.log("Wrong referaal code")}else{
        return data;
      }
    })
  }
var sendingEmail = function(sendingTo,subject,text){
    console.log("sendingTo====>>>",sendingTo);
    console.log("subject====>>>>",subject);
    console.log("text=======>>>>>",text);
    var transporter = nodemailer.createTransport("SMTP", {
            host: "email-smtp.eu-west-1.amazonaws.com",
            port: 25,
            auth: {
                user: "AKIAJNU4EXCXCHBHXA7Q",
                pass: "AjIFLFyvf02cuQpDoOiFRqgMZcaE7q2yuvzJXvaSIfwf"
              }
            });
      transporter.sendMail({  //Email options
          from: "nikhil.jaiswal@mobiloitte.in", // sender address.
          to: sendingTo, // receiver
          subject:subject, // subject
          html:text
        });
  }

  var sendMessage =function(number,text){client.messages.create({
      body: 'Your otp-  '+text,
      to:number,  // Text this number
      from: '+17605072118' // From a valid Twilio number
      // from: '+17605072118' // From a valid Twilio number
  }).then(function(){return 'done'})}


  var imageUpload = function(image,callback){
    var img_base64 = image;
                var binaryData = new Buffer(img_base64, 'base64');
                fs.writeFile("./test.jpeg", binaryData, "binary",function(err) {});
                cloudinary.uploader.upload("./test.jpeg",function(result){
                  console.log("image url",result)
                  callback(null,result.url)
                });
  }
  
////--------------------------------------------P
module.exports = {

 authenticate: (req, res, next) => {
        // check header or url parameters or post parameters for token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        console.log("##########", token)
        // decode token
        if (token) {

            console.log("bbbb", token)

            // verifies secret and checks exp
            jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false, message: 'Failed to authenticate token.', status: 463,
                        type: "OAuthException"
                    });
                } else {
                    console.log("decoded token=====>",decoded);
                    User.find({otp_checker_id:decoded._id,active:true},(error,success) => {
                      if(error) {
                        console.log(error);
                        res.status(500).send({
                        responseMessage:"Unexpected Error",
                        responseCode:"500"
                      })
                      }
                      else {
                        console.log("decoded token user data==>",success)
                        if(!success) {
                          res.status(400).send({
                            responseCode:400,
                            responseMessage:"User not found"
                          })
                        }
                        else {
                          console.log("is blocked========>",success[0].blocked);
                          if(success[0].blocked) {
                            res.status(400).send({
                            responseCode:400,
                            responseMessage:"User is blocked from admin"
                          })

                          }
                          else {
                            req.decoded = decoded;
                            next();
                          }
                        }
                      }
                    })
                    // if everything is good, save to request for use in other roughts.
                    
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    },

              // send android notification function
      "android_notification": function(deviceToken,msg,chatType,title,sendorId,senderName,type) {
          console.log("chatType==>>",deviceToken);
            console.log("module called")
        //    var deviceToken ="APA91bFLyrVqNOdk-u8Ci29vpcZaMQap4YrtMX6WMlpWjb8apGQrl8GfpZvKZezsziGY90n5-1jkcjs-yYA_5w5GFGQCLKh2-7SSekrBSqXjiaboeuSDePE";
            var serverKey = "AIzaSyChK0J_JT_UjxVu6YqV7PfAzOLIpiDSsWQ";
            console.log("title====>",title)
            var fcm = new FCM(serverKey);
           var message = {
              to: deviceToken,
              'data.sound':"default", 
              'data.message': msg,
                "title": title,
              'data.type': chatType,
              'data.senderName':senderName
            };
            console.log("android_notification message===>",message);


            fcm.send(message, function(err, response){
               if (err) {
                   console.log("Something has gone wrong!");
                    //res.send({responseCode:500,responseMessage:"success"});
                   console.log("errror"+err);
               } else {
                  //res.send({responseCode:200,responseMessage:"success"});
                   console.log("Successfully sent with response: "+response);
               }
            });

      },
        decodeBase64Image:function (dataString) {
        let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        // console.log(matches)

        if (matches.length !== 3) {
            return new Error('Invalid image');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    },
        dateFormatting:  function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    },
    encrypt:function (text) {
    console.log(text)
    let cipher = crypto.createCipher(config.algorithm, config.genKey);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
    },
    decrypt:function (text) {
    let decipher = crypto.createDecipher(config.algorithm, config.genKey);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}


}



