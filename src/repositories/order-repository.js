"use restrict";

const mongoose  = require("mongoose");
require('../models/order');
const modelMain = mongoose.model("Order");

exports.get = async () => {

    const res = await modelMain.find({}, {__v: 0})
                        .populate('customer', 'name')
                        .populate('items.product', 'title');
    return res;
};

exports.create = async ( data ) => {
    const res = await ( new modelMain( data ) ).save();
    return res;
};