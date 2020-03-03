function eval() {
    // Do not use eval!!!
    return;
}

function calculator(expr) {
    let arrExpr = expr.split(' ');
    let i = 0;
    while( i < arrExpr.length - 1) {
        i++;
        if (arrExpr[i] == "*") {
            arrExpr[i] = Number(arrExpr[i-1]) * Number(arrExpr[i+1]);
            arrExpr.splice(i-1, 1);
            arrExpr.splice(i, 1);
            i = i - 1;
        }

        if (arrExpr[i] == "/") {
            if (arrExpr[i+1] == 0) throw new TypeError('TypeError: Division by zero.');
            arrExpr[i] = Number(arrExpr[i-1]) / Number(arrExpr[i+1]);
            arrExpr.splice(i-1, 1);
            arrExpr.splice(i, 1);
            i = i - 1;
        }
    }

    i = 0;
    while( i < arrExpr.length - 1) {
        i++;
        if (arrExpr[i] == "+") {
            arrExpr[i] = Number(arrExpr[i-1]) + Number(arrExpr[i+1]);
            arrExpr.splice(i-1, 1);
            arrExpr.splice(i, 1);
            i = i - 1;
        }

        if (arrExpr[i] == "-") {
            arrExpr[i] = Number(arrExpr[i-1]) - Number(arrExpr[i+1]);
            arrExpr.splice(i-1, 1);
            arrExpr.splice(i, 1);
            i = i - 1;
        }
    }
    return Number(arrExpr[0]);
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');

    opened_br = ((br = expr.match(/\(/g)) != null) ? br.length : 0;
    closed_br = ((br = expr.match(/\)/g)) != null) ? br.length : 0;
    if (opened_br !== closed_br) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    let subCalc;
    while (opened_br > 0){
        if ((subCalc = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)) !== null ) {
                let str = subCalc[0].replace('(','').replace(')','');
                expr = expr.replace(subCalc[0], calculator(str));
        }
        
        opened_br -= 1;
    }

    let res = calculator(expr);
  
    return res;
}

module.exports = {
    expressionCalculator
}