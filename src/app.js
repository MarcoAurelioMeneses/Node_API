"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();

// Conexão com o banco
mongoose.connect(config.connectionString);

const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carregar rotas
const indexRoutes = require('../src/routes/index');
const indexProductsRoutes = require('../src/routes/productRoutes');
const indexCustomerRoutes = require('../src/routes/customer-route');
const indexOrderRoutes = require('../src/routes/order-route');

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Resquest-With, Content-type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})


app.use("/", indexRoutes);
app.use("/products", indexProductsRoutes);
app.use("/customers", indexCustomerRoutes);
app.use("/orders", indexOrderRoutes);

module.exports = app;
