const express = require('express');
const route = require('./route/route.js');
const cookieParser = require("cookie-parser")
const app = express();

require('dotenv').config();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect(process.env.DB,
 {useNewUrlParser: true})
    .then(() => console.log('MongoDb is connected'))
    .catch(err => console.log(err))

app.use('/', route);
//----------handling wrong api edge case--------------------------------------------
app.use((req, res, next) => {
    res.status(404).send({ status: false, error: "path not found" });
})

app.listen(process.env.PORT , function() {
	console.log('Express app running on port ' + (process.env.PORT ))
});