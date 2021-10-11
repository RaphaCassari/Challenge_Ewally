const express = require('express'),
    router = express.Router(),
    getInfos = require('../controllers/mainController'),
    validation = require('../controllers/validation')

// Middleware para validação
router.get('/:id', validation)

// Executa função para geração de informações pedidas
router.get('/:id', getInfos)

module.exports = router;