// Create reference to elements
const display = document.querySelector('.display-operation');
const buttons = document.querySelectorAll('.buttons');
const digitButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('#decimal');
const equalButton = document.querySelector('#equal');
const allClearButton = document.querySelector('#ac');
const delButton = document.querySelector('#del');
const percentButton = document.querySelector('#percent');

// Define operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? 'Error' : a / b);
const percent = operand => operand / 100;
const ROUND = 10000000000;

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

const getPercent = () => {
  digitString /= 100;
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
display.textContent = '0';

allClearButton.addEventListener('click', clearMemory);
delButton.addEventListener('click', delInput);
percentButton.addEventListener('click', getPercent);
decimalButton.addEventListener('click', disableDecimal);

digitButtons.forEach(digitButton => {
  digitButton.addEventListener('click', () => {
    userInput = digitButton.innerText;
    digitString += digitButton.innerText;
    digitString.startsWith('.')
      ? (display.textContent = digitString = '0.')
      : (display.textContent = digitString);
  });
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener('click', () => {
    userInput = operatorButton.innerText;
    decimalButton.disabled = false;

    operands.push(Number(digitString));

    lastOperand = operands.length - 1;

    operators.unshift(operatorButton.innerText);

    if (results.length === 0) {
      operand1 = Number(digitString);
      results.unshift(operand1);
    } else {
      operand1 = results[0];
      operator = operators[1];
      operand2 = operands[lastOperand];

      results.unshift(operate(operand1, operator, operand2));
      console.log('results:', results);
    }

    display.textContent = results[0];
    digitString = '';
  });
});

equalButton.addEventListener('click', () => {
  userInput = equalButton.innerText;
  operands.push(Number(digitString));
  console.log('operands:', operands);

  operand1 = results[0];
  console.log('operand1:', operand1);

  operator = operators[0];
  console.log('operator:', operator);

  operand2 = Number(digitString);
  console.log('operand2:', operand2);

  results.unshift(operate(operand1, operator, operand2));
  console.log('results:', results);

  display.textContent = results[0];

  digitString = '';

  operands = [];
  //   operators = [];
  //   results = [];
  //   operatorClick = 0;
});
