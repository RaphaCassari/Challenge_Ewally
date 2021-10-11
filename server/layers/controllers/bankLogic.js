class InfosBank {

    get(lineCode) {
        let barCode = this.create_barCode(lineCode)
        let object = {
            barCode: barCode,
            amount: this.create_value(barCode),
            expirationDate: this.create_dataVencimento(barCode)
        }
        return object
    }

    create_barCode(lineCode) {
        let barCode = lineCode.replace(/[^0-9]/g, '');
        // CÁLCULO DO DÍGITO DE AUTOCONFERÊNCIA (DAC)   -   5ª POSIÇÃO
        if (barCode.length < 47) barCode = barCode + '00000000000'.substr(0, 47 - barCode.length);
        barCode = barCode.substr(0, 4) +
            barCode.substr(32, 15) +
            barCode.substr(4, 5) +
            barCode.substr(10, 10) +
            barCode.substr(21, 10);
        return (barCode);
    }

    create_dataVencimento(barCode) {
        if (barCode.substr(5, 4) == 0)
            return ('Boleto pode ser pago em qualquer data');
        else {
            let currentDate, date, month,
                days = barCode.substr(5, 4);
            date = new Date();
            currentDate = new Date();
            currentDate.setFullYear(1997, 9, 7);
            date.setTime(currentDate.getTime() + (1000 * 60 * 60 * 24 * days));
            month = (currentDate.getMonth() + 1);
            if (month < 10) month = "0" + month;
            let day = (currentDate.getDate() + 1);
            if (day < 10) day = "0" + day;
            let dateFormat = (date.getFullYear() + "-" + ((date.getMonth() + 1)) + "-" + (date.getDate()));
            return (dateFormat)
        }
    }

    create_value(barCode) {
        return (barCode.substr(9, 8) * 1) + ',' + barCode.substr(17, 2);
    }
}

module.exports = InfosBank