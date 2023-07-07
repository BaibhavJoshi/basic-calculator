class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number;
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.previousOperand !== "") {
            this.compute();
        }

        if(operation === "÷"){
            this.operation = "/";
        } else if(operation === "×"){
            this.operation = "*";
        } else {
            this.operation = operation;
        }

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(){
        let result;
        if(this.previousOperand === "" || this.currentOperand === "") {
            return;
        }
        result = eval(this.previousOperand + this.operation + this.currentOperand);
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    displayFormat(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0});
        }

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){

        this.currentOperandTextElement.innerText = this.displayFormat(this.currentOperand);
        this.previousOperandTextElement.innerText = this.displayFormat(this.previousOperand);

        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.displayFormat(this.previousOperand)} ${this.operation}`;
        }
    }
}

const acButton = document.querySelector(".btn-ac");
const delButton = document.querySelector(".btn-del");
const eqButton = document.querySelector(".btn-eq");
const numberButtons = document.querySelectorAll(".btn-number");
const operationButtons = document.querySelectorAll(".btn-operation");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

eqButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

acButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})

delButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})