var numbers = document.querySelectorAll(".number");
var operators = document.querySelectorAll(".operator");
var clear = document.querySelectorAll(".clear");

//select the "previous calculation" text
function pastCalculation() {
  return document.getElementById("previous-calc").innerText;
}

//select the "current operation" text
function getOutput() {
  return document.getElementById("current-number").innerText;
}

//Display previous calculation
function printHistory(num) {
  document.getElementById("previous-calc").innerText=format(num);
}

//Display current output
function printOutput(num) {
  document.getElementById("current-number").innerText= format(num);
}

//make sure all numbers have commas
function format(num) {
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}

//JS needs numbers to NOT have commas to work with
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ''));
}

//click event listener for operators
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click',function(){
    alert("The operator clicked is " + this.id);
  })
}

//click event listener for numbers
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function(){
    var output = reverseNumberFormat(getOutput());
    if (output !== NaN) {
      output += this.innerText;
      printOutput(output);
    }
  })
}

//click event listener for clearing
for (let i = 0; i < clear.length; i++) {
  clear[i].addEventListener('click',function(){
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } if (this.id == "delete") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length-1);
        printOutput(output);
      }
    }
  })
}
