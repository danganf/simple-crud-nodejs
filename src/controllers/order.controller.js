"use restrict";

const ValidContracts = require('../validators/valid');
const repository     = require('../repositories/order-repository');
const guid           = require('guid');

exports.get = async (req, res, next) => {

    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({ message: "Nenhum registro localizado", data: e });
    }

};


exports.post = async (req, res, next) => {

    try{
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 10),
            items: req.body.items
        });
        res.status(201).send({ message: "Pedido criado com sucesso" });
    } catch(e){
        res.status(400).send({ message: "Falha ao salvar o registro", data: e });
    };

};