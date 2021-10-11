const ticketRoute = require('./ticket.routes'),
    express = require('express'),
    router = express.Router();

router.use('/boleto', ticketRoute);

// Tratamento para erro 404
router.use(function(req, res, next) {
    res.status(404).send("Esta rota não existe");
});

module.exports = router;