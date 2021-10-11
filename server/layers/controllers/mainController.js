const getInfosBank = require('./bankLogic'),
    /* getInfosConcessionaria = require('./concessionaria') */
    InfosConcessionaria = require('./concessionaria'),
    InfosBank = require('./bankLogic')
infosConcessionaria = new InfosConcessionaria();
infosBank = new InfosBank();

function getInfos(req, res) {
    let codigo = req.params.id;
    if (res.locals.type == 'CONCESSIONARIA') {
        let result = infosConcessionaria.get(codigo)
        res.status(200).send(result)
    } else {
        let result = infosBank.get(codigo)
        res.status(200).send(result)
    }
}

module.exports = getInfos