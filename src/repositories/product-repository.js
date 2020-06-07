"use restrict";

const mongoose = require("mongoose");
require('../models/product');
const MProduct = mongoose.model("Product");

exports.get = async () => {

    const res = await MProduct.find({active: true}, {__v: 0});
    return res;
};

exports.getBySlug = async ( value ) => {
  
    const res = await MProduct.findOne({slug: value, active: true} , 'title description price slug tags' );
    return res;
};

exports.getByTag = async ( value ) => {
  
    const res = await MProduct.find({tags: value, active: true} , 'title description price slug tags' );
    return res;
};

exports.getById = async ( id ) => {
    const res = await MProduct.findById( id, {__v: 0} );
    return res;
};

exports.create = async ( data ) => {
    const res = await ( new MProduct( data ) ).save();
    return res;
};

exports.update = async ( id, body ) => {  
    const res = await MProduct.findByIdAndUpdate( id, {
        $set: {
          title: body.title,
          description: body.description,
          price: body.price,
          active: body.active,
          tags: body.tags,
        }
      } );
    return res;  
};

exports.delete = async ( id ) => {
    const res = await MProduct.findByIdAndDelete(id);
    return res;
};