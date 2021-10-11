const InfosBank = require('./bankLogic'),
    InfosConcessionaria = require('./concessionaria');

infosConcessionaria = new InfosConcessionaria();
infosBank = new InfosBank();

function getInfos(req, res) {
    const codigo = req.params.id;
    if (res.locals.type == 'CONCESSIONARIA') {
        const result = infosConcessionaria.get(codigo);
        res.status(200).send(result);
    } else {
        const result = infosBank.get(codigo);
        res.status(200).send(result);
    }
}

module.exports = getInfos;