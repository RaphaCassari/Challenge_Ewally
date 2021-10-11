const ticketRoute = require('./ticket.routes'),
    express = require('express'),
    router = express.Router();

router.use('/boleto', ticketRoute);

module.exports = router;