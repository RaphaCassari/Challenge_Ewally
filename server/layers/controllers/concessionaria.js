class InfosConcessionaria {

    get(lineCode) {
        let barCode = this.create_barCode(lineCode)
        let object = {
            barCode: barCode,
            amount: this.create_value(barCode),
        }
        return object
    }

    create_barCode(lineCode) {
        lineCode = lineCode.replace(/[^0-9]/g, '');
        lineCode = lineCode.split('');
        lineCode.splice(11, 1);
        lineCode.splice(22, 1);
        lineCode.splice(33, 1);
        lineCode.splice(44, 1);
        lineCode = lineCode.join('');
        return lineCode;
    }

    create_value(barCode) {
        barCode = barCode.replace(/[^0-9]/g, '');
        let ticketValue = '',
            finalValue,
            reference = barCode.substr(2, 1);
        if (reference == '6' || reference == '8') {
            ticketValue = barCode.substr(4, 11);
            finalValue = ticketValue.substr(0, 9) + '.' + ticketValue.substr(9, 2);
            let char = finalValue.substr(1, 1);
            // Isolar Valor do Boleto
            while (char === '0') {
                finalValue = finalValue.slice(1)
                char = finalValue.substr(1, 1);
            }
        } else {
            finalValue = 0;
        }
        return finalValue * 100;
    }
}

module.exports = InfosConcessionaria