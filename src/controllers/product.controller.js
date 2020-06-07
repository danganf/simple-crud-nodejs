"use restrict";

const valid      = require('../validators/valid');
const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {

    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({ message: "Nenhum registro localizado", data: e });
    }

};

exports.getBySlug = async (req, res, next) => {
  
    try{
        let data = await repository.getBySlug( req.params.value );
        res.status(200).send(data || []);
    } catch(e){
        res.status(400).send({ message: "Nenhum registro localizado", data: e });
    };

};

exports.getByTag = async (req, res, next) => {
  
    try{
        let data = await repository.getByTag( req.params.value );
        res.status(200).send(data || []);
    } catch(e){
        res.status(400).send({ message: "Nenhum registro localizado", data: e });
    };

};

exports.getById = async (req, res, next) => {
  
    try{
        let data = await repository.getById(req.params.value );
        res.status(200).send(data || []);
    } catch(e){
        res.status(400).send({ message: "Nenhum registro localizado", data: e });
    };

};

exports.post = async (req, res, next) => {

    valid.hasMinLen( req.body.title, 3, 'Titulo tem que ter no minimo 3 caracteres' );
    valid.hasMinLen( req.body.slug, 3, 'Slug tem que ter no minimo 3 caracteres' );
    valid.hasMinLen( req.body.description, 2, 'Descrição tem que ter no minimo 3 caracteres' );    
    if( valid.isValid() ){
        
        try{
            await repository.create( req.body );
            res.status(201).send({ message: "Registro salvo com sucesso" });
        } catch(e){
            res.status(400).send({ message: "Falha ao salvar o registro", data: e });
        };

    } else {
        res.status(400).send( valid.errors() );
    }

};

exports.put = async (req, res, next) => {  
    
    try{
        await repository.update( req.params.id, req.body );
        res.status(200).send({ message: "Registros atualizado com sucesso" });
    } catch(e){
        res.status(400).send({ message: "Falha ao atualizar o registro", data: e });
    };

};

exports.delete = async (req, res, next) => {

    try{
        await repository.delete(req.params.id);
        res.status(200).send({ message: "Registros deletado com sucesso" });
    } catch(e){
        res.status(400).send({ message: "Nenhum registro localizado", data: e });
    };

};