"use restrict";

const mongoose = require("mongoose");
const MProduct = mongoose.model("Product");

exports.get = () => {

    return MProduct.find({active: true}, {__v: 0});
};

exports.getBySlug = ( value ) => {
  
    return MProduct.findOne({slug: value, active: true} , 'title description price slug tags' );
};

exports.getByTag = ( value ) => {
  
    return MProduct.find({tags: value, active: true} , 'title description price slug tags' );
};

exports.getById = ( id ) => {
    return MProduct.findById( id, {__v: 0} );
};

exports.create = ( data ) => {
    return ( new MProduct( data ) ).save();
};

exports.update = ( id, body ) => {  
    return MProduct.findByIdAndUpdate( id, {
        $set: {
          title: body.title,
          description: body.description,
          price: body.price,
          active: body.active,
          tags: body.tags,
        }
      } );
};

exports.delete = ( id ) => {
    return MProduct.findByIdAndDelete(id);
};