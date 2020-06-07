"use restrict";

const mongoose = require("mongoose");
const MProduct = mongoose.model("Product");
const ValidContracts = require('../validators/valid');
const repository = require('../repositories/product-repository');

exports.get = (req, res, next) => {
  
  repository.get()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((e) => {
          res.status(400).send({ message: "Nenhum registro localizado", data: e });
        });
};

exports.getBySlug = (req, res, next) => {
  
  repository.getBySlug( req.params.value )
    .then((data) => {
      res.status(200).send(data || []);
    })
    .catch((e) => {
      res.status(400).send({ message: "Nenhum registro localizado", data: e });
    });
};

exports.getByTag = (req, res, next) => {
  
  repository.getByTag( req.params.value )
    .then((data) => {
      res.status(200).send(data || []);
    })
    .catch((e) => {
      res.status(400).send({ message: "Nenhum registro localizado", data: e });
    });
};

exports.getById = (req, res, next) => {
  
  repository.getById(req.params.value )
    .then((data) => {
      res.status(200).send(data || []);
    })
    .catch((e) => {
      res.status(400).send({ message: "Nenhum registro localizado", data: e });
    });
};

exports.post = (req, res, next) => {

  let valid = new ValidContracts();
  valid.hasMinLen( req.body.title, 3, 'Titulo tem que ter no minimo 3 caracteres' );
  valid.hasMinLen( req.body.slug, 3, 'Slug tem que ter no minimo 3 caracteres' );
  valid.hasMinLen( req.body.description, 2, 'Descrição tem que ter no minimo 3 caracteres' );

  if( valid.isValid() ){
    repository.create( req.body )
      .then((x) => {
        res.status(201).send({ message: "Registros salvo com sucesso" });
      })
      .catch((e) => {
        res.status(400).send({ message: "Falha ao salvar o registro", data: e });
      });
  } else {
      res.status(400).send( valid.errors() );
  }

};

exports.put = (req, res, next) => {  
  repository
    .update( req.params.id, req.body )
    .then((x) => {
      res.status(200).send({ message: "Registros atualizado com sucesso" });
    })
    .catch((e) => {
      res.status(400).send({ message: "Falha ao atualizar o registro", data: e });
    });
};

exports.delete = (req, res, next) => {
  repository
    .delete(req.params.id)
    .then((data) => {
      res.status(200).send({ message: "Registros deletado com sucesso" });
    })
    .catch((e) => {
      res.status(400).send({ message: "Nenhum registro localizado", data: e });
    });
};