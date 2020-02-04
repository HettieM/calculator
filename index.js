var numbers = document.querySelectorAll(".number");
var operators = document.querySelectorAll(".operator");

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

printOutput(94692985);
printHistory(1234);

//JS needs numbers to NOT have commas to work with
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ''));
}

alert(reverseNumberFormat(getOutput()));
