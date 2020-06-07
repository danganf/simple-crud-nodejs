"use restrict";

const mongoose                = require("mongoose");
const md5                     = require("md5");
const {CONFIG_SALT_CRIPT_KEY} = require('../config');
require('../models/customer');
const modelMain = mongoose.model("Customer");

exports.get = async () => {

    const res = await modelMain.find({active: true}, {__v: 0});
    return res;
};

exports.create = async ( data ) => {

    data.password = md5( data.password + CONFIG_SALT_CRIPT_KEY )

    const res = await ( new modelMain( data ) ).save();
    return res;
};