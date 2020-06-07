"use restrict";

const mongoose = require("mongoose");
const MProduct = mongoose.model("Product");

exports.get = (req, res, next) => {
  
  MProduct
    .find({active: true}, {__v: 0})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send({ message: "Nenhum registro localizado", data: e });
    });
};

exports.getBySlug = (req, res, next) => {
  
  MProduct
    .findOne({slug: req.params.value, active: true} , 'title description price slug tags' )
    .then((data) => {
      res.status(200).send(data || []);
    })
    .catch((e) => {
      res.status(400).send({ message: "Nenhum registro localizado", data: e });
    });
};

exports.getByTag = (req, res, next) => {
  
  MProduct
    .find({tags: req.params.value, active: true} , 'title description price slug tags' )
    .then((data) => {
      res.status(200).send(data || []);
    })
    .catch((e) => {
      res.status(400).send({ message: "Nenhum registro localizado", data: e });
    });
};

exports.getById = (req, res, next) => {
  MProduct
    .findById(req.params.value, {__v: 0} )
    .then((data) => {
      res.status(200).send(data || []);
    })
    .catch((e) => {
      res.status(400).send({ message: "Nenhum registro localizado", data: e });
    });
};

exports.post = (req, res, next) => {
  let product = new MProduct(req.body);
  product
    .save()
    .then((x) => {
      res.status(201).send({ message: "Registros salvo com sucesso" });
    })
    .catch((e) => {
      res.status(400).send({ message: "Falha ao salvar o registro", data: e });
    });
};

exports.put = (req, res, next) => {  
  MProduct
    .findByIdAndUpdate( req.params.id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        active: req.body.active,
        tags: req.body.tags,
      }
    } )
    .then((x) => {
      res.status(200).send({ message: "Registros atualizado com sucesso" });
    })
    .catch((e) => {
      res.status(400).send({ message: "Falha ao atualizar o registro", data: e });
    });
};

exports.delete = (req, res, next) => {
  MProduct
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "Registros deletado com sucesso" });
    })
    .catch((e) => {
      res.status(400).send({ message: "Nenhum registro localizado", data: e });
    });
};
