const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const config = require('./config/config-dev')
const temp=require('socket.io')
const cors = require('cors')
var sessions = require("client-sessions");




mongoose.connect(config.mongo_url, { useMongoClient: true })

app.use(morgan('dev'))

app.use(bodyParser.json({ limit: '100mb' }))

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(sessions({
    cookieName: 'mySession',
    requestKey: 'forcedSessionKey', // requestKey overrides cookieName for the key name added to the request object.
    secret: 'blargadeeblargblarg', // should be a large unguessable string or Buffer
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
}))

app.use('/user', userRoutes)

app.use('/admin', adminRoutes)

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(config.server_port, () => {
    console.log("clothing Server Connected =======> " + config.server_port)
})

