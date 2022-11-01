const express = require('express');
const Router = express.Router();


//? calling my controllers
const {
    ProductData,
    GetProductData,
    UpdateMyProductData,
    DeleteProductData
} = require('../Controller/ProductManagementController');

//?Calling My Middlewares
const {
    UploadProductImage
  } =  require('../middlewares/UploadMedia');

Router.post('/ProductData',UploadProductImage.single('ProductImage'), ProductData);
Router.get('/GetProductData', GetProductData);
Router.post('/UpdateMyProductData', UpdateMyProductData);
Router.delete('/DeleteProductData', DeleteProductData);

module.exports = Router;