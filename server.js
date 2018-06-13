const express = require('express')
let app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan')
const path = require('path');
let userRoutes = require('./routes/userRoutes');
let adminRoutes = require('./routes/adminRoutes');
let config = require('./config/config-dev');
let temp=require('socket.io');

mongoose.connect(config.mongo_url, { useMongoClient: true });

app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assetsTemp')));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });


/*****************Allow Cross Origin Access***************************/
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,jwt');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
 });

app.use('/user', userRoutes);
app.use('/admin', adminRoutes)

app.listen(config.server_port, () => {
    console.log("clothing Server Connected =======> " + config.server_port)
});

