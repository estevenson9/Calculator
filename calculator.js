"use strict";
let calculationArray = [];
let currentInputValue = "";
let equalsLastPressed = false;
let modifierLastPressed = false;
const calculatorScreen = document.querySelector(".calculator-screen");

const allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("mouseenter", hoverEffectOn);
  button.addEventListener("mouseleave", hoverEffectOff);
});

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
  updateCalculatorScreen();
}

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", clearInputArray);

const numericalButtons = document.querySelectorAll(".input-button");
const numericalButtonsArray = Array.from(numericalButtons);
numericalButtonsArray.forEach((button) =>
  button.addEventListener("click", numberPressed)
);

const modifierButtons = document.querySelectorAll(".modifier-button");
const modifierButtonsArray = Array.from(modifierButtons);
modifierButtonsArray.forEach((button) =>
  button.addEventListener("click", modifierPressed)
);

const equalButton = document.querySelector(".operate-button");
equalButton.addEventListener("click", () => {
  if (!equalsLastPressed && !modifierLastPressed) {
    calculationArray.push(currentInputValue);
  }
  addToCalculationArray();
  equalsLastPressed = true;
  modifierLastPressed = false;
});

function clearInputArray() {
  currentInputValue = "";
  calculationArray = [];
  equalsLastPressed = false;
  updateCalculatorScreen();
}

function updateCalculatorScreen() {
  if (currentInputValue.length < 1) {
    if (calculationArray.length < 1) {
      calculatorScreen.textContent = "0";
    } else {
      calculatorScreen.textContent =
        Math.round(calculationArray[0] * 100) / 100;
    }
  } else {
    calculatorScreen.textContent = currentInputValue;
  }
}

function calculatePairs() {
  currentInputValue = "";
  if (calculationArray.length >= 3) {
    console.log(calculationArray);
    let operatedValue = operate(calculationArray);
    if (typeof operatedValue === "number") {
      clearInputArray();
      calculationArray.push(operatedValue);
    } else {
      calculationArray.push(operatedValue);
      updateCalculatorScreen();
      clearInputArray();
    }
  }
}

function numberPressed() {
  numericalButtonsArray.forEach((button) => {
    if (button.textContent === this.textContent) {
      button.style.backgroundColor = "lightblue";
    } else {
      button.style.backgroundColor = "";
    }
  });
  if (equalsLastPressed) {
    calculationArray = [];
    equalsLastPressed = false;
  }
  modifierLastPressed = false;
  addToCurrentValue(this);
}

function addToCurrentValue(reference) {
  currentInputValue += reference.textContent;
  updateCalculatorScreen();
}

function modifierPressed() {
  modifierButtonsArray.forEach((button) => {
    if (button.textContent === this.textContent) {
      button.style.backgroundColor = "orange";
    } else {
      button.style.backgroundColor = "";
    }
  });

  if (!equalsLastPressed && !modifierLastPressed) {
    calculationArray.push(currentInputValue);
    addToCalculationArray();
    calculationArray.push(this.textContent);
  } else {
    calculationArray[1] = this.textContent;
  }
  modifierLastPressed = true;
  equalsLastPressed = false;
}

function addToCalculationArray() {
  calculatePairs();
  updateCalculatorScreen();
  console.log(calculationArray);
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
    return "Trying to break the laws of math ehh";
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
updateCalculatorScreen();
