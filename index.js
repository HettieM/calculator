class Calculator {
  constructor(historyTextElement, outputTextElement) {
    this.historyTextElement = historyTextElement;
    this.outputTextElement = outputTextElement;
    this.clear();
  }

  clear() {
    this.output = "";
    this.history = "";
    this.operation = undefined;
  }

  delete() {
    this.output = this.output.toString().slice(0,-1);
  }

  appendNumber(number) {
    //only allow decimal once
    if (number === "." && this.output.includes(".")) return;
    //convert to string so numbers concatenate rather than adding
    this.output = this.output.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.output === "") return;
    if (this.history !== "") {
      this.compute()
    }
    this.operation = operation;
    this.history = this.output;
    this.output = "";
  }

  compute() {
    var computation;
    const prev = parseFloat(this.history);
    const current = parseFloat(this.output);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "-":
        computation = prev - current;
        break;
      default:
        return;
    }
    this.output = computation;
    this.operation = undefined;
    this.history = "";
  }

  formatNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    var integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return integerDisplay + "." + decimalDigits;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.outputTextElement.innerText = this.formatNumber(this.output);
    if (this.operation != null) {
        this.historyTextElement.innerText =  this.formatNumber(this.history.toString()) + " " + this.operation;
    } else {
      this.historyTextElement.innerText = '';
    }
  }
}



const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const historyTextElement = document.querySelector("#previous-calc");
const outputTextElement = document.querySelector("#current-number");

const calculator = new Calculator(historyTextElement, outputTextElement)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
})

clearButton.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
})
