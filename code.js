//object to keep track of values
const calc = {
    displayValue : '0', //what should be displayed
    firstValue : null, //first input
    secondValue : false, //second input, only if firstValue and operator have an input
    operator : null,
};

//function to updating display
function updateDisplay() {
    //find display
    const display = document.querySelector('.calculator-screen');
    //change display
    display.value = calc.displayValue;
};

//keys
const keys = document.querySelector('.calc-keys');
//read keys when clicked
keys.addEventListener('click', (event) => {
    //save chosen value
    const { target } = event;
    const { value } = target;
    //check type
    if (!target.matches('button')) {
        return;
    }
    //action for other forms of values
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            operators(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            reset();
            break;
        case '%':
            percentage(value);
            break;
        case '±':
            minPos(value);
            break;
        default:
            // check if the key is an integer
            if (Number.isInteger(parseFloat(value))) {
                inputData(value);
            }
    }

    updateDisplay();
});

//input data
function inputData(digit){
    const {displayValue, secondValue} = calc;
    if(secondValue === true){
        //if there is a second value show value
        calc.displayValue = digit;
        //reset second value
        calc.secondValue = false;
    } else {
        //overwrite display
        calc.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

//input decimal
function inputDecimal(dot){
    if(calc.secondValue === true){
        calc.secondValue = '0.';
        //set false
        calc.secondValue = false;
        return;
    }
    if(!calc.displayValue.includes(dot)){
        //add decimal
        calc.displayValue += dot;
    }
}

//input minus and plus
function minPos(sign){
    if(!calc.displayValue.includes(sign)){
        var c = calc.displayValue;
        c *= -1;
        calc.displayValue = c;
    }
}

//reset 
function reset(){
    calc.displayValue = '0';
    calc.firstValue = null;
    calc.secondValue = false;
    calc.operator = null;
    console.log(calc);
}

//operators
function operators(nextOp){
    const {firstOp, displayValue, operator} = calc;
    //parsefloat - string to number
    const input = parseFloat(displayValue);
    if(operator && calc.secondValue){
        //override operator if change mind
        calc.operator = nextOp;
        return;
    }
    if(firstOp === null && !isNaN(input)){
        //update firstOp
        calc.firstOp = input;
    } else if(operator) {
        const result = calculate(firstOp, input, operator);
        //stops after a certian amount of places
        calc.displayValue = `${parseFloat(result.toFixed(7))}`;
        calc.firstOp = result;
    }
    calc.secondValue = true;
    calc.operator = nextOp;
}

//calculate
function calculate(firstVa, secondVa, operator){
    if(operator === '+'){
        return firstVa + secondVa;
    } else if (operator === '-') {
        return firstVa - secondVa;
    } else if (operator === '*'){
        return firstVa * secondVa;
    } else if (operator === '/'){
        return firstVa / secondVa;
    }
    return secondVa;
}

//percent, negPos
function percentage(per){
    var y = calc.displayValue;
    var t = y / 100;
    calc.displayValue = t;
}

//keyboard input
//I've been trying to get the keyboard function to work for the last week and I couldn't get it to work
//I've watched videos on it and I've tried different ways but couldn't get it to work. This is the closest I got...
//Also the first time I put the numbers in it shows up with NaN, but the second time it gives me the amount, not sure why...

window.addEventListener("keydown", function(event){
    if(event.defaultPrevented){
        return;
    }
    updateDisplay();
    var key = event.key;
    if(isFinite(key)){
        console.log(key);
        inputData(key);
    } else if (key == '+'){
        console.log(key);
        operators(key);
    } else if (key == '-'){
        console.log(key);
        operators(key);
    } else if (key == '*'){
        console.log(key);
        operators(key);
    } else if (key == '/'){
        console.log(key);
        operators(key);
    } else if (key == '='){
        console.log('=');
        calculate(key);
    } else {
        console.log('Error');
    }
})