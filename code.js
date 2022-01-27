//Variables
    //display DOM
let display = document.getElementById('display');
    //Array for the buttons
let buttons = Array.from(document.getElementsByClassName('button'));
    
//Action
    //eventListener, .map
buttons.map( button => {
    //when clicked show what is on button
    button.addEventListener('click', (e) => {
        //take the chosen button and if special give action
        switch(e.target.innerText){
            //figure out what button
            case 'C':
                //change display
                display.innerText = '';
                break;
            case '=':
                try{
                    //read display and then change display
                    display.innerText = eval(display.innerText);
                } catch {
                    //read display if can't equal them show error
                    display.innerText = "Error"
                }
                break;
            case '←':
                if (display.innerText){
                    //read display and erase last placed number
                    display.innerText = display.innerText.slice(0, -1);
                }
                break;
            //if nothing need special action just show what was choose.
            default:
                display.innerText += e.target.innerText;
        }
    });
});

