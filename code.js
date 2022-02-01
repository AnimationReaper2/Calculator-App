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
//keyboard input
