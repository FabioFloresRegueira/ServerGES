const express = require('express')
const router = express.Router()
const tagsController =   require('../controllers/tags.controller');

// endpoint no integrator host
// https://fabio4678.c44.integrator.host/monitorar/api/tags/todo


// lista todos os Tags de serviço
//http://localhost:3001/monitorar/api/tags/todos
router.get('/todos', tagsController.findAll);

// lista todos os Tags de serviço que estão ativas
//http://localhost:3001/monitorar/api/tags/ativos
router.get('/ativos', tagsController.findAllativos);

// lista todas as Tags de serviço entre 0 a 30 dias paro termino da vigencia. 
//http://localhost:3001/monitorar/api/tags/vigencia0a30
router.get('/vigencia0a30', tagsController.find0a30);

// lista todas as Tags de serviço entre 31 a 60 dias para termino de vigendia. 
//http://localhost:3001/monitorar/api/tags/vigencia31a60
router.get('/vigencia31a60', tagsController.find31a60);

// lista todas as Tags de serviço entre 61 a 90 dias para termino de vigencia. 
//http://localhost:3001/monitorar/api/tags/vigencia60a90
router.get('/vigencia61a90', tagsController.find61a90);

// lista todas as Tags de servico maio que 90 dias para termino de vigencia. 
//http://localhost:3001/monitorar/api/tags/vigenciamaior90
router.get('/vigenciamaior90', tagsController.findmaior90);

// lista todas as Tags de serviço que estão desativadas. 
//http://localhost:3001/monitorar/api/tags/inativos
router.get('/inativos', tagsController.findAllinativos);



// cria um registro de tag de serviço 
//http://localhost:3001/monitorar/api/tags
router.post('/', tagsController.create);

// busca uma tag de serviço por id 
//http://localhost:3001/monitorar/api/tags/iDCliente
router.get('/:id', tagsController.findById);

// atualiza uma Tag de serviço por id
//http://localhost:3001/monitorar/api/tags/iDCliente
router.put('/:id', tagsController.update);

// Deleta unma Tag de serviço por id
//http://localhost:3001/monitorar/api/tags/iDCliente
router.delete('/:id', tagsController.delete);

// Deleta todas as Tags de serviço (limpeza)
//http://localhost:3001/monitorar/api/tags
router.delete('/', tagsController.limpeza); 


module.exports = router