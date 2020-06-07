"use restrict";

const valid      = require('../validators/valid');
const repository = require('../repositories/customer-repository');

exports.get = async (req, res, next) => {

    try {
        let data = await repository.get();        
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({ message: "Nenhum registro localizado", data: e });
    }

};


exports.post = async (req, res, next) => {

    valid.hasMinLen( req.body.name, 3, 'Nome tem que ter no minimo 3 caracteres' );
    valid.isEmail( req.body.email, 'Email invalido' );
    valid.hasMinLen( req.body.password, 4, 'Senha tem que ter no minimo 4 caracteres' );    
    if( valid.isValid() ){
        
        try{
            await repository.create( {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            } );
            res.status(201).send({ message: "Registro salvo com sucesso" });
        } catch(e){
            res.status(400).send({ message: "Falha ao salvar o registro", data: e });
        };

    } else {
        res.status(400).send( valid.errors() );
    }

};