"use restrict";

const mongoose  = require("mongoose");
require('../models/customer');
const modelMain = mongoose.model("Customer");

exports.get = async () => {

    const res = await modelMain.find({active: true}, {__v: 0});
    return res;
};

exports.create = async ( data ) => {
    const res = await ( new modelMain( data ) ).save();
    return res;
};