const Concessionaire = require('../controllers/concessionaire')
concessionaire = new Concessionaire()

test('Gerador de informações de boleto de Concessionaria OK', () => {
    expect(concessionaire.get('816800000001076500632005602210010602500160001052')).toStrictEqual({ "amount": 765, "barCode": "81680000000076500632006022100106050016000105" });
});

test('Geração do código de barras OK', () => {
    expect(concessionaire.create_barCode('816800000001076500632005602210010602500160001052')).toStrictEqual('81680000000076500632006022100106050016000105');
});

test('Geração do valor OK', () => {
    expect(concessionaire.create_value('81680000000076500632006022100106050016000105')).toStrictEqual(765);
});