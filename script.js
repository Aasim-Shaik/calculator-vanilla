
class Calculator {

    #isDecimalExists = false;

    #calulatorArr = [];

    #operator ;

    #operatorMap = {add:this.#add, substract:this.#substract, division:this.#divide, multiplication:this.#multiply, '':this.#doNothing};

    constructor() {
    }

    calculate(){
        if(this.#calulatorArr.length >= 2){
            this.#calulatorArr[0] = this.#operatorMap[this.#operator](this.#calulatorArr[0],this.#calulatorArr[1]);
            this.#calulatorArr.splice(1,1);
        }
    }

    get getNumber() {
        return this.#calulatorArr[0];
    }
    get getArray() {
        return this.#calulatorArr;
    }

    clearArray() {
        this.#calulatorArr = [];
        this.#operator = '';
    }

    get operator() {
        return this.#operator;
    }

    setOperator(id){
        this.#operator = id;
    }

    get isDecimalExists(){
        return this.#isDecimalExists;
    }

    setDecimalExists(bool){
        this.#isDecimalExists = bool;
    }

    pushNumber(num) {
        this.#calulatorArr.push(num);
    }

    #doNothing(num1,num2){
        return;
    }

    #add(num1 , num2){
        if(typeof num1 == 'number' && typeof num2 == 'number')
            return num1 + num2;
        else
            return -1;
    }
    
    #substract(num1 , num2){
        if(typeof num1 == 'number' && typeof num2 == 'number')
            return num1 - num2;
        else
            return -1;
    }
    
    #multiply(num1 , num2){
        if(typeof num1 == 'number' && typeof num2 == 'number')
            return Math.round((num1 * num2)*10000)/10000;
        else
            return -1;
    }
    
    #divide(num1 , num2){
        if(typeof num2 == 'number' && num2 == 0)
            return 'error';
        else if(typeof num1 == 'number' && typeof num2 == 'number')
            return Math.round((num1 / num2)*10000)/10000;
        else
            return -1;
    }

}

let calc = new Calculator();

function printToScreen(num){
    let screen = document.querySelector('#screen');
    let length = screen.dataset.length;
    if(length >20){
        screen.textContent = 'Too long Number!';
        return false;
    }
    screen.dataset.length = ++length;
    screen.textContent += num;
    return true;
}

function clearScreen(){
    let screen = document.querySelector('#screen');
    screen.dataset.length = 0;
    calc.setDecimalExists(false);
    screen.textContent = '';

}

function backspaceScreen(){
    let screen = document.querySelector('#screen');
    let content = screen.textContent;
    let size = content.length;

    if(size == 0)
        return false;

    if(content[size-1] == '.')
        calc.setDecimalExists(false);

    content = content.slice(0,-1);
    screen.textContent = content;
    return true;
}

function pushToArray(num){
    let number = +num;
    if(!isNaN(number)){
        calc.pushNumber(number);
        return true;
    }
    else
        return false;
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

let buttonContainer = document.querySelector('#button-container');
buttonContainer.addEventListener('click' , (e) => {
    let id = e.target.id;
    let digit = +id.substr(-1);

    if(id == 'clear'){
        calc.clearArray();
        clearScreen();
    }

    if(id == 'backspace')
        backspaceScreen();

    if(id == 'equal') {
        let content = document.querySelector('#screen').textContent;
        if(content != '' && calc.operator != ''){
            clearScreen();
            pushToArray(content)
            calc.calculate()
            calc.setOperator('');
            printToScreen(calc.getNumber != undefined ? calc.getNumber : '');
            calc.clearArray();
    }

        console.log(calc.getArray);
    }

    if(id == 'decimal'){
        let decimalState = calc.isDecimalExists;

        if(!decimalState){
            calc.setDecimalExists(true);
            if(document.querySelector('#screen').textContent == '')
                printToScreen('0.');
            else
                printToScreen('.');
        }
        else{
            //do nothing
        }
    }

    if(id.startsWith('num') && isNaN(digit) == false){
        printToScreen(digit);
    }

    if( id == 'add' || id == 'substract' || id == 'division' || id == 'multiplication' ){
        let content = document.querySelector('#screen').textContent;
        if(content == ''){
            calc.setOperator(id);
        }

        else if(content != ''){
            pushToArray(content);
            clearScreen();
            calc.calculate();
            calc.setOperator(id);
        }

    }

});
