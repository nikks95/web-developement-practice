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
let div = (a, b) => a / b;
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
let checknum = (ch) => {
    if ((ch >= '0' && ch <= '9') || ch == '.') {
        return true;
    } else {
        return false;
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
            
            for (let j = start; j < i ; j++) {
                s += exp.charAt(j);
            }
            arr.push(s);
            arr.push(exp.charAt(i));
            start = i + 1;
        }
    }
    let s = "";
    for (let j = start; j < len ; j++) {
        s += "" + exp.charAt(j);
    }
    arr.push(s);
    return arr;
}

