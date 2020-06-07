'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const app        = express();
const router     = express.Router();

const {CONFIG_MONGO_CONN_STRING} = require('./configs/config-default');

//CONECTAR BANCO DE DADOS
mongoose.connect( CONFIG_MONGO_CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } );

app.use( bodyParser.json( { limit: '5mb' } ) );
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