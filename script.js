function add(num1 , num2){
    if(typeof num1 == 'number' && typeof num2 == 'number')
        return num1 + num2;
    else
        return -1;
}

function substract(num1 , num2){
    if(typeof num1 == 'number' && typeof num2 == 'number')
        return num1 - num2;
    else
        return -1;
}

function multiply(num1 , num2){
    if(typeof num1 == 'number' && typeof num2 == 'number')
        return num1 * num2;
    else
        return -1;
}

function divide(num1 , num2){
    if(typeof num1 == 'number' && typeof num2 == 'number')
        return num1 / num2;
    else
        return -1;
}

let themeButton = document.querySelector('#theme-button');
themeButton.addEventListener('click' , (e) => {
    let theme = document.body.dataset.themeMode;

    if(theme == 'dark')
        theme = 'light';
    else if(theme == 'light')
        theme = 'dark';

        document.body.dataset.themeMode = theme;
});


/*
let bt = document.querySelector('#button-container');
bt.addEventListener('click' , (e) => {
    console.log(e.target.id);
})
function calculate(num1 , num2 , operator){
    let result;
    switch (operator) {
        case '+':
            result=add(num1,num2);
            break;
        case '-':
            result=substract(num1,num2);
            break;
        case '/':
            result=divide(num1,num2);
            break;
        case '*':
            result=multiply(num1,num2);
            break;    
        default:
            result=-1;
            break;
    }

    return result;
}
*/