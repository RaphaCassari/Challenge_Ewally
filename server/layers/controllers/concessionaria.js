class InfosConcessionaria {

    get(lineCode) {
        let barCode = this.create_barCode(lineCode)
        let object = {
            barCode: barCode,
            amount: this.create_value(barCode),
            //expirationDate: fator_vencimento(barCode)
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
        let boletoValue = '',
            finalValue,
            reference = barCode.substr(2, 1);
        if (reference == '6' || reference == '8') {
            boletoValue = barCode.substr(4, 11);
            finalValue = boletoValue.substr(0, 9) + '.' + boletoValue.substr(9, 2);
            let char = finalValue.substr(1, 1);
            while (char === '0') {
                // Verificar Função
                finalValue = this.substringReplace(finalValue, '', 0, 1);
                char = finalValue.substr(1, 1);
            }
        } else {
            finalValue = 0;
        }
        return finalValue * 100;
    }

    substringReplace(str, repl, inicio, tamanho) {
        if (inicio < 0) {
            inicio = inicio + str.length;
        }
        tamanho = tamanho !== undefined ? tamanho : str.length;
        if (tamanho < 0) {
            tamanho = tamanho + str.length - inicio;
        }
        return [
            str.slice(0, inicio),
            repl.substr(0, tamanho),
            repl.slice(tamanho),
            str.slice(inicio + tamanho)
        ].join('');
    }
}

module.exports = InfosConcessionaria