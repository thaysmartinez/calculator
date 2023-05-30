// Create reference to elements
const display = document.querySelector('.display-operation');
const buttons = document.querySelectorAll('.buttons');
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
  operands = [];
  operators = [];
  display.textContent = 0;
};

const delInput = () => {
  digitString = display.innerText.slice(0, -1);

  // display 0 if all numbers are deleted
  digitString === ''
    ? (display.textContent = '0')
    : (display.textContent = digitString);
};

const disableDecimal = () => {
  decimalButton.disabled = true;
};

const truncateNumber = value => {
  // check if the value has a decimal point
  const hasDecimal = value.includes('.');

  // Check if value is longer than 10 characters (including the decimal point)
  // Truncate the value to 10 characters
  if (value.length > 12 && !hasDecimal) value = value.slice(0, 12);

  // Truncate the value to 11 characters (including the decimal point)
  if (value.length > 13 && hasDecimal) value = value.slice(0, 13);

  display.textContent = value;
};

let digitString = '';
let operands = [];
let operators = [];

display.textContent = '0';

allClearButton.addEventListener('click', clearMemory);
delButton.addEventListener('click', delInput);
decimalButton.addEventListener('click', disableDecimal);

digitButtons.forEach(digitButton => {
  digitButton.addEventListener('click', () => {
    // enable delete button
    delButton.disabled = false;

    // append digits to form operands
    digitString += digitButton.innerText;
    // digitString = truncateNumber(digitString);

    // show leading zero if input starts with decimal point
    digitString.startsWith('.')
      ? (digitString = '0' + digitString)
      : (digitString = digitString);

    truncateNumber(digitString);
  });
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener('click', () => {
    // enable decimal button after operator click
    decimalButton.disabled = false;

    // do not store operand if no number was input into the calculator
    if (digitString !== '') {
      operands.push(Number(digitString));
    }

    // store last operator entered
    operators.push(operatorButton.innerText);
    digitString = '';
  });
});

equalButton.addEventListener('click', () => {
  // store last number input into calculator display
  operands.push(Number(display.innerText));

  // display result
  let result = operate(
    operands[operands.length - 2],
    operators[operators.length - 1],
    operands[operands.length - 1]
  );
  //   display.textContent = result;
  truncateNumber(result.toString());

  // store result
  operands.push(Number(display.innerText));

  // reset number input
  digitString = '';

  // disable delete button after equals is pressed
  delButton.disabled = true;
});
