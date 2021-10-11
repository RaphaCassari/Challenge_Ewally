// Titulo
const data = BigInt(
        '21290001192110001210904475617405975870000002000'
    ).toString()
    // Vencimento
    // Verificar para datas acima de 22.02.2025 (9999)
const code_expirationDate = data.slice(33, 37)
const dayInMiliSecounds = 86400000
const expirationDate_time = Number(code_expirationDate) * dayInMiliSecounds
const baseData = new Date('10/07/1997').getTime()
const expirationDate = new Date(baseData + expirationDate_time)
console.log(expirationDate)

// Valor
const amount = (Number(data.slice(37)) / 100).toFixed(2)
console.log(amount)

// Digito Verificador
let field1 = data.slice(0, 9).split('').map(Number)
let field2 = data.slice(9, 20).split('').map(Number)
let field3 = data.slice(20, 31).split('').map(Number)

function fieldsLogic(element, index) {
    if (index % 2 == 0) {
        var result = element * 2
        if (result > 9) {
            result = result.toString().split('').map(Number)
            return result[0] + result[1]
        } else {
            return result
        }
    } else {
        return Number(element)
    }
}

function digitVeric(field) {
    field = field.map(fieldsLogic)
    let sum = field.reduce((total, currentElement) => total + currentElement)
    let proxDezena = Number(sum.toString()[0]) + 1
    let rest = sum % 10
    let result = proxDezena - rest
    return result
}



/* field1.push(digitVeric(field1))
field2[field2.length-1] = digitVeric(field2)
field3[field3.length-1] = digitVeric(field3)

console.log(field1, field2, field3) */