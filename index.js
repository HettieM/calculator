var numbers = document.querySelectorAll(".number");
var operators = document.querySelectorAll(".operator");
var clear = document.querySelectorAll(".clear");
var decimalAllowed = true;

if(decimalAllowed === true) {
  //add a decimal point
  decimalAllowed === false;
} else {
  //do not allow decimal to be pressed until a new number
}



//select the "previous calculation" text
function getHistory() {
  return document.getElementById("previous-calc").innerText;
}

//select the "current operation" text
function getOutput() {
  return document.getElementById("current-number").innerText;
}

//text shown in history
function printHistory(num) {
  document.getElementById("previous-calc").innerText=num;
}

//text shown in output
function printOutput(num) {
  if (num == "") { //do not show 0, show blank
    document.getElementById("current-number").innerText = num;
  } else {
    document.getElementById("current-number").innerText= format(num);
  }
}

//format numbers to include commas in display
function format(num) {
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}

//reformat numbers to NOT include commas in JS
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ''));
}


//click event listener for numbers - print to output
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
      printOutput("");
      printHistory("");
    } if (this.id == "delete") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length-1);
        printOutput(output);
      }
    }
  })
}

//event listener for operators
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', function() {
    var output = getOutput();
    var history = getHistory();

    //if we want to change the operator? - output empty, history full
    if (output == "" && history != "") {
      if (isNaN(history[history.length-1])) {
        history = history.substr(0, history.length-1);
      }
    }

    // output occupied OR history occupied
    if (output != "" || history != "") {
      //when saving a number to history that is greater than 999 (no ,)
      output = output == ""? output:reverseNumberFormat(output);
      history = history + output;
      if (this.id == "equals") {
        var result = eval(history);
        printOutput(result);
        printHistory("");
      }
      else {
        history = history + this.innerText;
        printHistory(history);
        printOutput("");
      }
    }


  })
}
