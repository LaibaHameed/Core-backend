//? Dependencies Start

const express = require('express');
// CORS stands for Cross-Origin Resource Sharing.
// npm i cors express nodemon
const cors = require('cors');
const path = require('path');
// npm install crypto-js
// Crypto is a module in Node. js which deals with an algorithm that performs data encryption and decryption. This is used for security purpose like user authentication where storing the password in Database in the encrypted form. Crypto module provides set of classes like hash, HMAC, cipher, decipher, sign, and verify.
// const crypto = require('crypto');
const ApplicationConfiguration = require('./configuration/ApplicationCOnfiguration');
const ResponseOfMyDataBase = require('./configuration/DataBaseConfiguration')

//? Dependencies ends



//? Initilizing the app starts

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.raw());
app.use(cors());
app.use('/assets', express.static('assets'));
const PORT = process.env.PORT || 1234;

//? Initilizing the app ends



//?Start Block Setting th Headers for your Application

app.all('*', (req, res, next) => {
  // This is how we protect the api
  res.header('Access-Control-Allow-Origin', '*');// So it make the header allow to the origin when cross platfrom try to exchange the data
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    //Mehtod is a property which help us to use the Methods by request. Browers send the options request before your Mthods request
  }
  next(); //if nothing of the response sent back so next() means other rou
});

//?End Block Setting the Header for your Application



//?Start Block Accessing The Routes in the Entry Point

const _ProductManagementRoute = require('./Routes/ProductManagementRoute');
const _AdminManagementRoute = require('./routes/AdminManagementRoute');
const _PaymentManagement = require('./routes/PaymentManagementRoute');

//*****UsingRoutes*****//
app.use('/ProductManagement', _ProductManagementRoute);
app.use('/AdminManagement', _AdminManagementRoute);
app.use('/PaymentManagement', _PaymentManagement);
//*****UsingRoutes*****//

//?End Block Accessing The Routes in the Entry Point


//Serving Front End Form Your Server.js(Express)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname +`/${process.env.STATIC_FOLDER}`));
// })
//Serving Front End Form Your Server.js(Express)


//?Start Block Checking Routes As express not found Url not Founded we need to do it explicitly 

app.use((req, res, next) => {
  const error = new Error('Url not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    }
  })
});

//?End Block Checking Routes As express not found Url not Founded we need to do it explicitly



//?Start Block For Listening Your App On Defined Port

app.listen(PORT, () => {
  console.log(`You Application has Launched from the Port 🚀 🚀 ${PORT}`);
  console.log(process.env.STRIPE_DEVELOPMENT_KEY);
})

//?End Block For Listening Your App On Defined Port


// npm run dev