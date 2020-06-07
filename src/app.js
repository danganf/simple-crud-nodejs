'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const app    = express();
const router = express.Router();

//CONECTAR BANCO DE DADOS
mongoose.connect(
    'mongodb+srv://danielguimaraes:ICYMZmdDGvP5NmqD@cluster0-ym3tu.mongodb.net/test'
, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

require('./models/product');

//CARREGAR ROTAS
const routeIndex    = require('./routes/index');
const routeProducts = require('./routes/products');

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

app.use( '/'        , routeIndex );
app.use( '/products', routeProducts );

module.exports = app;