// Create reference to elements
const display = document.querySelector('.display-operation');
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
  //   results = [];
  clickEvent = 0;
};

let digitString = '';
let operand1;
let operand2;
let operands = [];
let operators = [];
let results = [];
let operand;
let operator;
let clickEvent = 0;

// Update display

delButton.addEventListener('click', () => {
  digitString = display.innerText.slice(0, -1);
  display.textContent = digitString;
});

allClearButton.addEventListener('click', () => {
  display.textContent = 0;
  clearMemory();
});

percentButton.addEventListener('click', () => {
  digitString /= 100;
  display.textContent = digitString;
});

decimalButton.addEventListener('click', () => {
  decimalButton.disabled = true;
});

display.textContent = '0';
digitButtons.forEach(digitButton => {
  digitButton.addEventListener('click', () => {
    digitString += digitButton.innerText;
    digitString.startsWith('.')
      ? (display.textContent = digitString = '0.')
      : (display.textContent = digitString);
  });
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener('click', () => {
    decimalButton.disabled = false;
    operands.push(Number(digitString));
    operators.unshift(operatorButton.innerText);
    digitString = '';

    if (clickEvent === 0) {
      operand1 = operands[0];
      operator = operators[0];
      operand2 = 0;
      results.unshift(Math.round(operand1 * ROUND) / ROUND);
    } else {
      operand1 = results[0];
      operator = operators[1];
      operand2 = operands[operands.length - 1];
      results.unshift(
        Math.round(operate(operand1, operator, operand2) * ROUND) / ROUND
      );
    }
    display.textContent = results[0];
    clickEvent++;

    console.log('operand1', operand1);
    console.log('operand2', operand2);
    console.log('operator', operator);
    console.log('results', results);
  });
});

equalButton.addEventListener('click', () => {
  operand1 = results[0];
  operator = operators[0];
  operand2 = Number(digitString);
  results.unshift(operate(operand1, operator, operand2));

  operand1 === undefined || operand2 === undefined
    ? (display.textContent = '0')
    : (display.textContent = Math.round(results[0] * ROUND) / ROUND);

  clearMemory();

  console.log('operand1', operand1);
  console.log('operand2', operand2);
  console.log('operator', operator);
  console.log('results', results);
});
