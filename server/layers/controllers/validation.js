function validation(req, res, next) {
    let codigo = req.params.id

    // Tratativa para inputs sem considerar os ultimos digitos
    if (codigo.length == 36) {
        codigo = codigo + '00000000000';
    } else if (codigo.length == 46) {
        codigo = codigo + '0';
    }

    // Verificar Tipo do Boleto
    if (codigo.substr(0, 1) == '8') {
        res.locals.type = 'CONCESSIONARIA'
    } else {
        res.locals.type = 'BANCO'
    }

    // Validação
    if ((codigo.length != 47) && (codigo.length != 48)) {
        res.status(400).send('O código inserido possui ' + codigo.length + ' dígitos. Por favor insira uma numeração válida Linhas digitáveis podem possuir 47 (boletos bancários/cobrança) ou 48 (contas convênio/arrecadação) caracteres numéricos. Qualquer caractere não numérico será desconsiderado.')
    } else if ((codigo.substr(0, 1) == '8') && (codigo.length != 48)) {
        res.status(400).send('Este tipo de boleto deve possuir linha digitável de 48 caracteres numéricos.')
    } else if (!validarCodigoComDV(codigo, res.locals.type)) {
        res.status(400).send('A validação do dígito verificador falhou. Tem certeza que inseriu a numeração correta?')
    } else {
        next()
    }
}

function validarCodigoComDV(codigo, type) {
    codigo = codigo.replace(/[^0-9]/g, '');

    let resultado;

    if (type == 'BANCO') {
        const bloco1 = codigo.substr(0, 9) + calculaMod10(codigo.substr(0, 9)),
            bloco2 = codigo.substr(10, 10) + calculaMod10(codigo.substr(10, 10)),
            bloco3 = codigo.substr(21, 10) + calculaMod10(codigo.substr(21, 10)),
            bloco4 = codigo.substr(32, 1),
            bloco5 = codigo.substr(33);

        resultado = (bloco1 + bloco2 + bloco3 + bloco4 + bloco5).toString();
    } else {
        let bloco1, bloco2, bloco3, bloco4;

        let referencia = codigo.replace(/[^0-9]/g, '').substr(2, 1);

        if ((referencia == '6') || (referencia == '7')) {
            bloco1 = codigo.substr(0, 11) + calculaMod10(codigo.substr(0, 11));
            bloco2 = codigo.substr(12, 11) + calculaMod10(codigo.substr(12, 11));
            bloco3 = codigo.substr(24, 11) + calculaMod10(codigo.substr(24, 11));
            bloco4 = codigo.substr(36, 11) + calculaMod10(codigo.substr(36, 11));
        } else if ((referencia == '8') || (referencia == '9')) {
            bloco1 = codigo.substr(0, 11);
            bloco2 = codigo.substr(12, 11);
            bloco3 = codigo.substr(24, 11);
            bloco4 = codigo.substr(36, 11);

            let dv1 = parseInt(codigo.substr(11, 1)),
                dv2 = parseInt(codigo.substr(23, 1)),
                dv3 = parseInt(codigo.substr(35, 1)),
                dv4 = parseInt(codigo.substr(47, 1));

            let valid = (calculaMod11(bloco1) == dv1 &&
                calculaMod11(bloco2) == dv2 &&
                calculaMod11(bloco3) == dv3 &&
                calculaMod11(bloco4) == dv4)
            return valid;
        }
        resultado = bloco1 + bloco2 + bloco3 + bloco4;
    }
    return codigo === resultado;
}

function calculaMod10(numero) {
    numero = numero.replace(/\D/g, '');
    let i;
    let mult = 2;
    let soma = 0;
    let s = '';

    for (i = numero.length - 1; i >= 0; i--) {
        s = (mult * parseInt(numero.charAt(i))) + s;
        if (--mult < 1) {
            mult = 2;
        }
    }
    for (i = 0; i < s.length; i++) {
        soma = soma + parseInt(s.charAt(i));
    }
    soma = soma % 10;
    if (soma != 0) {
        soma = 10 - soma;
    }
    return soma;
}

function calculaMod11(x) {
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