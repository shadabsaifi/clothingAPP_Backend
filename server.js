const express = require('express')
let app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
let userRoutes = require('./routes/userRoutes')
let adminRoutes = require('./routes/adminRoutes')
let config = require('./config/config-dev')
let temp=require('socket.io')
const cors = require('cors')

mongoose.connect(config.mongo_url, { useMongoClient: true })

app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '100mb' }))
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)

app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(config.server_port, () => {
    console.log("clothing Server Connected =======> " + config.server_port)
});

