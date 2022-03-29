const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config/config')

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

require('./routes/app.route.js')(app);

mongoose.Promise = global.Promise;

mongoose.connect(config.dbUrl, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(config.port, () => {
    console.log("working on port " + config.port)
})
