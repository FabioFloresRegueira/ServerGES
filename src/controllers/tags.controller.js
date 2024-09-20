'use strict';
const Tags = require('../models/tags');


// Controler: Lista todas as Tags de monitoramento.
exports.findAll = function(req, res) {
    Tags.findAll(function(err, tags) {
    if (err)
        res.send(err);
        console.log('res', tags);
        res.send(tags);
    });
};

// Controler: Lista todas as Tags de monitoramento de serviços ativas.
exports.findAllativos = function(req, res) {
    Tags.findAllativos(function(err, tags) {
    if (err)
        res.send(err);
        console.log('res', tags);
        res.send(tags);
    });
};


// Controler: Lista todas as Tags de monitoramento de serviços ativas de 0 a30 dias para o termino da vigencia.
exports.find0a30 = function(req, res) {
    Tags.find0a30(function(err, tags) {
    if (err)
        res.send(err);
        console.log('res', tags);
        res.send(tags);
    });
};

// Controler: Lista todas as Tags de monitoramento de serviços ativas de 31 a 60 dias para o termino da vigencia.
exports.find31a60 = function(req, res) {
    Tags.find31a60(function(err, tags) {
    if (err)
        res.send(err);
        console.log('res', tags);
        res.send(tags);
    });
};

// Controler: Lista todas as Tags de monitoramento de serviços ativas de 61 a 90 dias para o termino da vigencia.
exports.find61a90 = function(req, res) {
    Tags.find61a90(function(err, tags) {
    if (err)
        res.send(err);
        console.log('res', tags);
        res.send(tags);
    });
};

// Controler: Lista todas as Tags de monitoramento de serviços ativas de 61 a 90 dias para o termino da vigencia.
exports.findmaior90 = function(req, res) {
    Tags.findmaior90(function(err, tags) {
    if (err)
        res.send(err);
        console.log('res', tags);
        res.send(tags);
    });
};


// Controler: Lista todas as Tags de monitoramento de serviços inativos.
exports.findAllinativos = function(req, res) {
    Tags.findAllinativos(function(err, tags) {
    if (err)
        res.send(err);
        console.log('res', tags);
        res.send(tags);
    });
};

// Controler: Cria uma Tag de monitoramento de serviço. 
exports.create = function(req, res) {
const new_tags = new Tags(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Por favor, forneça todos os campos obrigatórios.' });
        } else{
            Tags.create(new_tags, function(err, tags) {
        if (err)
            res.send(err);
            res.json({
                error:false,
                message:"Tag de monitoramento de serviço adicionada com sucesso. . . ", 
                data:tags});
        });
    }
};

// Controler: Lista uma Tag de Monitoramento de Serviço. 
exports.findById = function(req, res) {
Tags.findById(req.params.id, function(err, tags) {
    if (err)
        res.send(err);
        res.json(tags);
    });
};

// Controler: Atualiza uma Tag de Monitoramento de Serviço por ID.
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            res.status(400).send({ error:true, message: 'Por favor, forneça todos os campos obrigatórios.' });
    } else{
        Tags.update(req.params.id, new Tags(req.body), function(err, tags) {
        if (err)
            res.send(err);
            res.json({ error:false, 
                message: 'Tag de monitoramento de serviço atualizada com sucesso. . . ' });
        });
    }
};

// Controler: Apaga um registro de cliente por id.
exports.delete = function(req, res) {
Tags.delete( req.params.id, function(err, tags) {
    if (err)
        res.send(err);
        res.json({ error:false, 
            message: 'Tag de monitoramento de serviço Apagada com sucesso. . . ' 
        });
    });
};

// Controler: limpa todos os registros da base de dados. 
exports.limpeza = function(req, res) {
Tags.limpeza(function(err, tags){
    if (err) 
        res.send(err); 
        res.json({ erro: false, 
            message: "Todos as Tags de monitoramento de serviço foram apagadas com sucesso. . . "});  
    });
}