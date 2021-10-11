const Bank = require('./bank'),
    Concessionaire = require('./concessionaire');

concessionaire = new Concessionaire();
bank = new Bank();

function getInfos(req, res) {
    const codigo = req.params.id;
    if (res.locals.type == 'CONCESSIONARIA') {
        const result = concessionaire.get(codigo);
        res.status(200).send(result);
    } else {
        const result = bank.get(codigo);
        res.status(200).send(result);
    }
}

module.exports = getInfos;