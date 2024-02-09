"use strict";
let calculationArray = [];
let currentInputValue = "";
let equalsLastPressed = false;
let modifierLastPressed = false;

//Add keyboard interactivity
let keyPressed = window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      numberPressed(this, event.key);
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      modifierPressed(this, event.key);
      break;

    case ".":
      putDecimal();
      break;

    case "c":
      clearInputArray();
      break;

    case "Enter":
      equals();
      break;

    case "Backspace":
      deleteLastNumber();
      break;

    default:
      break;
  }
  updateCalculatorScreen();
});

const calculatorScreen = document.querySelector(".calculator-screen");

function hoverEffectOn() {
  this.style.border = "solid";
  this.style.borderColor = "#3c3c3c";
}

function hoverEffectOff() {
  this.style.border = "";
  this.style.borderColor = "";
}
const backspaceButton = document.querySelector(".backspace-button");
backspaceButton.addEventListener("click", deleteLastNumber);

function deleteLastNumber() {
  currentInputValue = currentInputValue.substring(
    0,
    currentInputValue.length - 1
  );
}

const decimalButton = document.querySelector(".decimal-button");
decimalButton.addEventListener("click", putDecimal);

function putDecimal() {
  let decimalExists = currentInputValue.includes(".");
  if (decimalExists) {
  } else {
    currentInputValue += ".";
  }
}

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", clearInputArray);

const numericalButtons = document.querySelectorAll(".input-button");
const numericalButtonsArray = Array.from(numericalButtons);
numericalButtonsArray.forEach((button) =>
  button.addEventListener("click", (reference) => {
    numberPressed(reference, null);
  })
);

const modifierButtons = document.querySelectorAll(".modifier-button");
const modifierButtonsArray = Array.from(modifierButtons);
modifierButtonsArray.forEach((button) =>
  button.addEventListener("click", (reference) => {
    modifierPressed(reference, null);
  })
);

const equalButton = document.querySelector(".operate-button");
equalButton.addEventListener("click", equals);
function equals() {
  if (!equalsLastPressed && !modifierLastPressed) {
    calculationArray.push(currentInputValue);
  }
  addToCalculationArray();
  equalsLastPressed = true;
  modifierLastPressed = false;
}

function clearInputArray() {
  currentInputValue = "";
  calculationArray = [];
  equalsLastPressed = false;
  // updateCalculatorScreen();
}

function calculatePairs() {
  currentInputValue = "";
  if (calculationArray.length >= 3) {
    let operatedValue = operate(calculationArray);
    clearInputArray();
    calculationArray.push(operatedValue);
    // updateCalculatorScreen();
    // clearInputArray();
  }
}

function numberPressed(reference, keyInput = null) {
  numericalButtonsArray.forEach((button) => {
    if (keyInput !== null) {
      if (button.textContent === keyInput) {
        button.style.backgroundColor = "lightblue";
      } else {
        button.style.backgroundColor = "";
      }
    } else {
      if (button.textContent === reference.target.textContent) {
        button.style.backgroundColor = "lightblue";
      } else {
        button.style.backgroundColor = "";
      }
    }
  });
  if (equalsLastPressed) {
    calculationArray = [];
    equalsLastPressed = false;
  }
  modifierLastPressed = false;
  if (keyInput !== null) {
    currentInputValue += keyInput;
  } else {
    currentInputValue += reference.target.textContent;
  }
}

function modifierPressed(reference, keyInput = null) {
  modifierButtonsArray.forEach((button) => {
    if (keyInput !== null) {
      if (button.textContent === keyInput) {
        button.style.backgroundColor = "orange";
      } else {
        button.style.backgroundColor = "";
      }
    } else {
      if (button.textContent === reference.target.textContent) {
        button.style.backgroundColor = "orange";
      } else {
        button.style.backgroundColor = "";
      }
    }
  });

  if (!equalsLastPressed && !modifierLastPressed) {
    if (keyInput !== null) {
      calculationArray.push(currentInputValue);
      addToCalculationArray();
      calculationArray.push(keyInput);
    } else {
      calculationArray.push(currentInputValue);
      addToCalculationArray();
      calculationArray.push(reference.target.textContent);
    }
  } else {
    if (keyInput !== null) {
      calculationArray[1] = keyInput;
    } else {
      calculationArray[1] = reference.target.textContent;
    }
  }
  modifierLastPressed = true;
  equalsLastPressed = false;
}

function addToCalculationArray() {
  calculatePairs();
  // updateCalculatorScreen();
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Not Allowed";
  }
  return a / b;
}

function operate(inputArray) {
  let firstValue;
  let secondValue;
  if (inputArray[0] === "") {
    firstValue = 0;
  } else {
    firstValue = parseFloat(inputArray[0]);
  }
  secondValue = parseFloat(inputArray[2]);
  let calculationModifier = inputArray[1];
  switch (calculationModifier) {
    case "+":
      return add(firstValue, secondValue);
    case "-":
      return subtract(firstValue, secondValue);
    case "*":
      return multiply(firstValue, secondValue);
    case "/":
      return divide(firstValue, secondValue);
  }
}
const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("mouseenter", hoverEffectOn);
  button.addEventListener("mouseleave", hoverEffectOff);
  button.addEventListener("click", updateCalculatorScreen);
});

function updateCalculatorScreen() {
  // If user is inputting show whats inputting
  // If user isnt inputting see if there is a current result,
  // if there is show that, with catch for divide by 0
  // if there isnt show 0
  if (currentInputValue.length < 1) {
    if (calculationArray.length < 1) {
      calculatorScreen.textContent = "0";
    } else if (isNaN(parseFloat(calculationArray[0]))) {
      calculatorScreen.textContent = calculationArray[0];
      clearInputArray();
    } else {
      calculatorScreen.textContent =
        Math.round(calculationArray[0] * 100) / 100;
    }
  } else {
    calculatorScreen.textContent = currentInputValue;
  }
}
updateCalculatorScreen();
