var inputbox = document.getElementById("inputExpression");

var elements = document.querySelectorAll(".dip");
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function () {
        let t = this.innerHTML;
        //alert(t);
        let s = inputbox.value;
        t = s + t;
        inputbox.value = t;

    });
}
let clear = () => {
    inputbox.value = "";
}
let add = (a, b) => a + b;
let sub = (a, b) => a - b;
let mul = (a, b) => a * b;
let div = (a, b) => { if (b == 0) { throw "Division by zero"; } else return a / b; };
let pow = (a, b) => Math.pow(a, b);
let checkop = (ch) => {
    switch (ch) {
        case '+':
        case '-':
        case 'x':
        case '/':
        case '^':
            return true;
        default: return false;
    }
}
let evalExp = (opr1, opr2, op) => {
    let opf = getop(op);
    let result = opf(parseFloat(opr1), parseFloat(opr2));
    return result;
}
let checknum = (ch, f = true) => {

    if ((ch >= '0' && ch <= '9')) {

        if (f == true && ch == '.')
            return true;
        else if (f == false && ch == '.')
            return false;
        return true;
    } else {
        return false;
    }
}
let opPrecedence = (ch) => {
    switch (ch) {
        case '+': return 1;
        case '-': return 1;
        case 'x': return 3;
        case '/': return 4;
        case '^': return 5;
        default: return null;
    }
}
let getop = (ch) => {
    switch (ch) {
        case '+': return add;
        case '-': return sub;
        case 'x': return mul;
        case '/': return div;
        case '^': return pow;
        default: return null;
    }
}
let splitify = (exp) => {
    let len = exp.length;
    let arr = [];
    start = 0;
    for (let i = 0; i < len; i++) {
        if (checkop(exp.charAt(i))) {
            let s = "";

            for (let j = start; j < i; j++) {
                s += exp.charAt(j);
            }
            arr.push(s);
            arr.push(exp.charAt(i));
            start = i + 1;
        }
    }
    let s = "";
    for (let j = start; j < len; j++) {
        s += "" + exp.charAt(j);
    }
    arr.push(s);
    return arr;
}
function validNumber(x) {
    if ((x.split(".")).length > 2 || !checknum((x.split("."))[0], false)) {
        return false;
    }
    return true;
}
function validateInput(expression) {
    for (let i = 0; i < expression.length; i++) {
        if (checkop(expression[i])) {
            if (i == 0) throw "Invalid Expression, expression does not starts with operator";
            else {
                if (checkop(expression[i - 1])) {
                    throw "Invalid Expression, Operator does not follow operator";
                }
            }
        }
        else {
            if (!validNumber(expression[i])) throw "Invalid Number";
        }
    }
}
let getTop = (arr) => arr[arr.length - 1];
function evaluateExpression(expression) {
    var operandStack = []
    var operatorStack = []

    let len = expression.length;
    try {
        for (let i = 0; i < len; i++) {
            if (!checkop(expression[i])) {
                operandStack.push(parseFloat(expression[i]));
                
            }
            else {
                if (operatorStack.length > 0) {
                    while (operatorStack.length > 0 && (opPrecedence(getTop(operatorStack)) > opPrecedence(expression[i]))) {
                        let opr1, opr2;
                        opr2 = operandStack.pop();
                        opr1 = operandStack.pop();
                        op = operatorStack.pop();
                        let result = evalExp(opr1, opr2, op);
                        operandStack.push(result);
                        
                    }
                    operatorStack.push(expression[i]);
                   
                }
                else {
                    operatorStack.push(expression[i]);
                   
                }
            }
        }
        while (operatorStack.length > 0) {
            let opr1, opr2;
            opr2 = operandStack.pop();
            opr1 = operandStack.pop();
            op = operatorStack.pop();
            let result = evalExp(opr1, opr2, op);
            operandStack.push(result);
        }
    }
    catch (e) {
         alert(e + ": Invalid operation");
         return "";
    }
    return operandStack[0];
}
function calculate() {
    let inp = inputbox.value;
    if (inp.length > 0) {
        let expression = splitify(inp);
        let result = "";
        try {
            validateInput(expression);
            result = evaluateExpression(expression);
        }
        catch (e) {
         alert("" + e);
        }
        inputbox.value = result;
    }
}
let clearButton = document.getElementById("clear");
let equalButton = document.getElementById("equal");
equalButton.addEventListener("click", () => calculate());
clearButton.addEventListener("click", () => clear());
