// Create reference to elements
const display = document.querySelector('.display-operation');
const digitButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('#decimal');
const equalButton = document.querySelector('#equal');
const allClearButton = document.querySelector('#ac');
const delButton = document.querySelector('#del');

// Define operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? 'Error' : a / b);

const operate = (operand1, operator, operand2) => {
  if (operator === '+') return add(operand1, operand2);
  if (operator === '-') return subtract(operand1, operand2);
  if (operator === 'x') return multiply(operand1, operand2);
  if (operator === '÷') return divide(operand1, operand2);
};

const clearMemory = () => {
  digitString = '';
  operand1;
  operator;
  operand2;
  operands = [];
  operators = [];
  results = [];
  display.textContent = 0;
};

const delInput = () => {
  digitString = display.innerText.slice(0, -1);
  display.textContent = digitString;
};

const disableDecimal = () => {
  decimalButton.disabled = true;
};

let digitString = '';
let operand1;
let operand2;
let operands = [];
let operators = [];
let results = [];
let userInput;
let operand;
let operator;
const ROUNDED = 100000000;

display.textContent = '0';

allClearButton.addEventListener('click', clearMemory);
delButton.addEventListener('click', delInput);
decimalButton.addEventListener('click', disableDecimal);

digitButtons.forEach(digitButton => {
  digitButton.addEventListener('click', () => {
    digitString += digitButton.innerText;
    // Display leading zero when decimal is pressed first
    digitString.startsWith('.')
      ? (display.textContent = digitString = '0.')
      : (display.textContent = digitString);
  });
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener('click', () => {
    decimalButton.disabled = false;

    // Store user input
    operands.push(Number(digitString));
    lastOperand = operands.length - 1;
    operators.unshift(operatorButton.innerText);

    // Store first operand
    if (results.length === 0) {
      operand1 = Number(digitString);
      results.unshift(operand1);
      // Store second operand and operate
    } else {
      operand1 = results[0];
      operator = operators[1];
      operand2 = operands[lastOperand];
      results.unshift(operate(operand1, operator, operand2));
    }

    display.textContent = Math.round(results[0] * ROUNDED) / ROUNDED;
    digitString = '';
  });
});

equalButton.addEventListener('click', () => {
  operands.push(Number(digitString));

  operand1 = results[0];
  operator = operators[0];
  operand2 = Number(digitString);

  results.unshift(operate(operand1, operator, operand2));

  display.textContent = Math.round(results[0] * ROUNDED) / ROUNDED;
  digitString = '';
});
