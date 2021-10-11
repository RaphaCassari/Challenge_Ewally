const express = require('express'),
    router = express.Router(),
    getInfos = require('../controllers/mainController'),
    validation = require('../controllers/validation')

router.get('/:id', validation)

router.get('/:id', getInfos)

module.exports = router;