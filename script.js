
class Calculator {

    #screenValue = '';
    
    #isDecimalExists = false;
    
    #calulatorArr = [];
    
    #operator ;
    
    #operatorMap = {add:this.#add, substract:this.#substract, division:this.#divide, multiplication:this.#multiply, '':this.#doNothing};
    
    constructor() {

    }

    setScreenValue(num){
        this.#screenValue = num;
    }

    get screenValue(){
        return this.#screenValue;
    }

    get screenlength(){
        return this.#screenValue.length;
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

let themeButton = document.querySelector('#theme-button');
themeButton.addEventListener('click' , (e) => {
    let theme = document.body.dataset.themeMode;

    if(theme == 'dark')
        theme = 'light';
    else if(theme == 'light')
        theme = 'dark';

        document.body.dataset.themeMode = theme;
});

addEventListener('load' , (e) => {
    let calc = new Calculator();
    
    let buttonContainer = document.querySelector('#button-container');
    buttonContainer.addEventListener('click' , (e) => {
        calculatorLogic(e,calc);
    });

    function calculatorLogic(e, calc) {

        let currentOperator = document.querySelector('#current-operator');

        function printToScreen(num){
            let screen = document.querySelector('#screen');
        
            let length = calc.screenlength;
        
            if(length >17){
                screen.textContent = 'Too long Number!';
                return false;
            }
        
            calc.setScreenValue(calc.screenValue+num);
        
            screen.textContent = calc.screenValue;
            return true;
        }
        
        function printOperatorToScreen(id){
            let operatorScreen = currentOperator;
            const idToOperator = {add:'+', substract:'-', division:'/', multiplication:'*', '':''};
            operatorScreen.textContent = idToOperator[id];
        }
        
        function clearScreen(){
            //clear the HTML screen
            let screen = document.querySelector('#screen');
            screen.textContent = '';
        
            //clear the class variable
            calc.setScreenValue('');
            calc.setDecimalExists(false);
        }
        
        function backspaceScreen(){
            let screen = document.querySelector('#screen');
            
            let content = calc.screenValue;
            let size = calc.screenlength;
        
            if(size == 0)
                return false;
        
            if(content[size-1] == '.')
                calc.setDecimalExists(false);
        
            content = content.slice(0,-1);
            calc.setScreenValue(content);
            screen.textContent = calc.screenValue;
            return true;
        }
        
        function pushToArray(numString){
            let number = +numString;
            if(!isNaN(number)){
                calc.pushNumber(number);
                return true;
            }
            else
                return false;
        }
        
            let id = e.target.id;
            let digit = +id.substr(-1);
        
            if(id == 'clear'){
                calc.clearArray();
                clearScreen();
                let currOperator = currentOperator;
                currOperator.textContent = '';
            }
        
            if(id == 'backspace')
                backspaceScreen();
        
            if(id == 'equal') {
                let content = calc.screenValue;
                if(content != '' && calc.operator != ''){
                    clearScreen();
                    pushToArray(content)
                    calc.calculate()
                    calc.setOperator('');
                    printToScreen(calc.getNumber != undefined ? calc.getNumber : '');
                    calc.clearArray();
                    currentOperator.textContent='';
            }
        
            }
        
            if(id == 'decimal'){
                let decimalState = calc.isDecimalExists;
        
                if(!decimalState){
                    calc.setDecimalExists(true);
                    if(calc.screenValue == ''){
                        printToScreen('0.');
                    }
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
                printOperatorToScreen(id);
                let content = calc.screenValue;
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
        
        }
    
});
