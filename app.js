//import dependencies
const express = require('express');
const app= new express();
const router = require('./src/Routes/api');
const bodyParser= require('body-parser');
const cookieParser =require('cookie-parser');
let multer = require('multer');
multer = multer();
const mysql= require('mysql');
const mongoose= require('mongoose');
const cors= require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const { rateLimit } = require('express-rate-limit');
const helmet= require('helmet');
const hpp= require('hpp');
const validator= require('validator');


//use dependencies
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(mongoSanitize());

app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(multer.array());
validator.isEmail('foo@bar.com');


//request rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter);



//Database connection

mongoose.connect('mongodb://127.0.0.1:27017/StudentRegisterCRUD')
  .then(() => console.log('MongoDB Connection Successful'));




  
app.use('/api',router);


//wrong url handler
app.use("*", (req,res)=>{
    res.status(404).json({status:"failed",Data:"Not found"})
});

module.exports = app;