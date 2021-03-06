const Bank = require('../controllers/bank');
bank = new Bank()

test('Gerador de informações de boleto Bancario OK', () => {
    expect(bank.get('21290001192110001210904475617405975870000002000')).toStrictEqual({ "amount": "20,00", "barCode": "21299758700000020000001121100012100447561740", "expirationDate": "2018-7-16" });
});

test('Gerado de código de barras OK', () => {
    expect(bank.create_barCode('21290001192110001210904475617405975870000002000')).toStrictEqual("21299758700000020000001121100012100447561740");
});