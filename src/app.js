'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const app        = express();
const router     = express.Router();

//CONECTAR BANCO DE DADOS
mongoose.connect('mongodb://localhost:27017/course', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

//CARREGAR ROTAS
const routeIndex     = require('./routes/index');
const routeProducts  = require('./routes/products');
const routeCustomers = require('./routes/customers');
const routeOrders    = require('./routes/orders');

app.use( '/'         , routeIndex );
app.use( '/products' , routeProducts );
app.use( '/customers', routeCustomers );
app.use( '/orders'   , routeOrders );

module.exports = app;