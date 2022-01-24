//variable for the calculator
const calc = document.querySelector('.calc');
//variable to the keys (having issues with the querySelector, error "Uncaught TypeError: Cannot read properties of null (reading 'querySelector')")
const keys = calc.querySelector('.calculator__keys');
//variable for the display
const display = document.querySelector('.calc_display');

//adding actions to the keys
keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        //variables to determine the type of the key
        const key = e.target;
        const action = key.dataset.action;
        //variables for the display
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        //variable for past key
        const previousKeyType = calc.dataset.previousKeyType;
        
        //if it has no data-action must be a number key
        if(!action){
            //replace display
            if(displayedNum === '0' || previousKeyType === 'operator'){//if display is 0
                display.textContent = keyContent;
            } else{//if display is another number
                display.textContent = displayedNum + keyContent;
            }
        }
        //if it does have a data-action must be an operator key
        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ){
            //replace display
            key.classList.add('is-depressed');
            //update display to clicked key by telling if the past key was an operator key
            //adding custom attribute
            calc.dataset.previousKeyType = 'operator';
            //getting the first num selected
            calc.dataset.firstValue = displayedNum;
            calc.dataset.operator = action;
        }
        //reads the other different kinds of data-action
        if (action === 'decimal') {
            //replace display
            display.textContent = displayedNum + '.';
        }
          
        if (action === 'clear') {
            display.textContent = '0';
        }
        //calculate function
        const calculate = (n1, operator, n2) =>{
            //perform calculation and return value
            let result = '';

            if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2)
              } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2)
              } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2)
              } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2)
              }
            return result;
        }
          
        if (action === 'calculate') {
            //getting the first num
            const firstValue = calc.dataset.firstValue;
            //getting the operator
            const operator = calc.dataset.operator;
            //we know second num(currently being displayed)
            const secondValue = displayedNum;

            //displaying
            display.textContent = calculate(firstValue, operator, secondValue);
        } 
        //remove is-depredded from the keys
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));
        
    }
})//end of key actions