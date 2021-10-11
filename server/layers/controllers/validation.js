function validation(req, res, next) {
    let code = req.params.id

    // Tratativa para inputs sem considerar os ultimos digitos
    if (code.length == 36) {
        code = code + '00000000000';
    } else if (code.length == 46) {
        code = code + '0';
    }

    // Verificar Tipo do Boleto
    if (code.substr(0, 1) == '8') {
        res.locals.type = 'CONCESSIONARIA'
    } else {
        res.locals.type = 'BANCO'
    }

    // Validação
    if ((code.length != 47) && (code.length != 48)) {
        res.status(400).send('O código inserido possui ' + code.length + ' dígitos. Por favor insira uma numeração válida Linhas digitáveis podem possuir 47 (boletos bancários/cobrança) ou 48 (contas convênio/arrecadação) caracteres numéricos. Qualquer caractere não numérico será desconsiderado.')
    } else if ((code.substr(0, 1) == '8') && (code.length != 48)) {
        res.status(400).send('Este tipo de boleto deve possuir linha digitável de 48 caracteres numéricos.')
    } else if (!check_validationDigit(code, res.locals.type)) {
        res.status(400).send('A validação do dígito verificador falhou. Tem certeza que inseriu a numeração correta?')
    } else {
        next()
    }
}

// Validação Digito Verificador
function check_validationDigit(code, type) {
    code = code.replace(/[^0-9]/g, '');

    let result;

    if (type == 'BANCO') {
        const bloc1 = code.substr(0, 9) + calcMod10(code.substr(0, 9)),
            bloc2 = code.substr(10, 10) + calcMod10(code.substr(10, 10)),
            bloc3 = code.substr(21, 10) + calcMod10(code.substr(21, 10)),
            bloc4 = code.substr(32, 1),
            bloc5 = code.substr(33);

        result = (bloc1 + bloc2 + bloc3 + bloc4 + bloc5).toString();
    } else {
        let bloc1, bloc2, bloc3, bloc4,
            reference = code.replace(/[^0-9]/g, '').substr(2, 1);

        if ((reference == '6') || (reference == '7')) {
            bloc1 = code.substr(0, 11) + calcMod10(code.substr(0, 11));
            bloc2 = code.substr(12, 11) + calcMod10(code.substr(12, 11));
            bloc3 = code.substr(24, 11) + calcMod10(code.substr(24, 11));
            bloc4 = code.substr(36, 11) + calcMod10(code.substr(36, 11));
        } else if ((reference == '8') || (reference == '9')) {
            bloc1 = code.substr(0, 11);
            bloc2 = code.substr(12, 11);
            bloc3 = code.substr(24, 11);
            bloc4 = code.substr(36, 11);

            let dv1 = parseInt(code.substr(11, 1)),
                dv2 = parseInt(code.substr(23, 1)),
                dv3 = parseInt(code.substr(35, 1)),
                dv4 = parseInt(code.substr(47, 1));

            let valid = (calcMod11(bloc1) == dv1 &&
                calcMod11(bloc2) == dv2 &&
                calcMod11(bloc3) == dv3 &&
                calcMod11(bloc4) == dv4)
            return valid;
        }
        result = bloc1 + bloc2 + bloc3 + bloc4;
    }
    return code === result;
}

function calcMod10(number) {
    number = number.replace(/\D/g, '');
    let i;
    let mult = 2;
    let sum = 0;
    let s = '';

    for (i = number.length - 1; i >= 0; i--) {
        s = (mult * parseInt(number.charAt(i))) + s;
        if (--mult < 1) {
            mult = 2;
        }
    }
    for (i = 0; i < s.length; i++) {
        sum = sum + parseInt(s.charAt(i));
    }
    sum = sum % 10;
    if (sum != 0) {
        sum = 10 - sum;
    }
    return sum;
}

function calcMod11(x) {
    let sequencia = [4, 3, 2, 9, 8, 7, 6, 5];
    let digit = 0;
    let j = 0;
    let DAC = 0;

    //FEBRABAN https://cmsportal.febraban.org.br/Arquivos/documentos/PDF/Layout%20-%20C%C3%B3digo%20de%20Barras%20-%20Vers%C3%A3o%205%20-%2001_08_2016.pdf
    for (let i = 0; i < x.length; i++) {
        let mult = sequencia[j];
        j++;
        j %= sequencia.length;
        digit += mult * parseInt(x.charAt(i));
    }

    DAC = digit % 11;

    if (DAC == 0 || DAC == 1)
        return 0;
    if (DAC == 10)
        return 1;
    return (11 - DAC);
}

module.exports = validation